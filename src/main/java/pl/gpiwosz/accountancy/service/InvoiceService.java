package pl.gpiwosz.accountancy.service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.jasperreports.JasperReportsUtils;
import pl.gpiwosz.accountancy.domain.*;
import pl.gpiwosz.accountancy.repository.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
@Transactional
public class InvoiceService {

    Logger log = LogManager.getLogger(InvoiceService.class);
    private final String invoice_template_path = "/jasper/invoice.jrxml";
    private static final String logo_path = "/jasper/price-logo.png";

    private final InvoiceRepository invoiceRepository;
    private final ProductRepository productRepository;
    private final MonthSumUpRepository monthSumUpRepository;
    private final EntryRepository entryRepository;
    private final IncomeRepository incomeRepository;

    public InvoiceService(InvoiceRepository invoiceRepository, ProductRepository productRepository, MonthSumUpRepository monthSumUpRepository, EntryRepository entryRepository, IncomeRepository incomeRepository) {
        this.invoiceRepository = invoiceRepository;
        this.productRepository = productRepository;
        this.monthSumUpRepository = monthSumUpRepository;
        this.entryRepository = entryRepository;
        this.incomeRepository = incomeRepository;
    }

    @Transactional
    public void removeInvoice(Long id){
        Optional<Entry> entry = entryRepository.findByInvoiceId(id);
        entry.ifPresent(entry1 -> entryRepository.deleteById(entry1.getId()));
//        Optional<Invoice> invoice = invoiceRepository.findById(id);
//        invoice.ifPresent(invoice1 -> invoiceRepository.delete(invoice1));
        invoiceRepository.deleteById(id);
    }

    @Transactional
    public Invoice saveInvoice(Invoice invoice){
        invoice.getProducts().forEach(s -> {
            s.setId(null);
            productRepository.save(s);
        });

        Company company = invoice.getCompany();
        Optional<MonthSumUp> monthSumUp = monthSumUpRepository.findByCompanyIdAndMonth(company.getId(), invoice.getDocumentDate().withDayOfMonth(1));
        Entry entry = new Entry();
        entry.setInvoice(invoice);
        Income income = new Income();
        Expense expense= new Expense();
        if(monthSumUp.isPresent()){
            if(monthSumUp.get().getIncomes() != null)
                entry.setIncome(monthSumUp.get().getIncomes());
            else{
                income.setEntries(new HashSet<>(Collections.singletonList(entry)));
                income.setMonthSumUp(monthSumUp.get());
                income.setDate(invoice.getDocumentDate().withDayOfMonth(1));
                entry.setIncome(income);
            }
            entryRepository.save(entry);
            monthSumUpRepository.save(monthSumUp.get());
        }
        else{
            MonthSumUp newMonthSumUp = new MonthSumUp();
            expense.setMonthSumUp(newMonthSumUp);
            income.setEntries(new HashSet<>(Collections.singletonList(entry)));
            income.setMonthSumUp(newMonthSumUp);
            income.setDate(invoice.getDocumentDate().withDayOfMonth(1));
            entry.setIncome(income);
            entryRepository.save(entry);

            newMonthSumUp.setIncomes(income);
            newMonthSumUp.setMonth(invoice.getDocumentDate().withDayOfMonth(1));
            newMonthSumUp.setCompany(company);
            newMonthSumUp.setIncomeSum(invoice.getTotalBrutto());
            newMonthSumUp.setIncomeTax(invoice.getTotalVat());
            newMonthSumUp.setSocialInsurance(834.55F);
            newMonthSumUp.setHealthContribution(342.32F);
            newMonthSumUp.setFundWord(70.05F);
            newMonthSumUp.setzUSsum(1246.92F);
            monthSumUpRepository.save(newMonthSumUp);
        }
        incomeRepository.save(income);
        Invoice result = invoiceRepository.save(invoice);
        return result;
    }

    public File generateInvoiceFor(Invoice order, Locale locale) throws IOException {

        File pdfFile = File.createTempFile(order.getName(), ".pdf");

        try(FileOutputStream pos = new FileOutputStream(pdfFile))
        {
            // Load the invoice jrxml template.
            final JasperReport report = loadTemplate();

            // Create parameters map.
            final Map<String, Object> parameters = parameters(order, locale);

            // Create an empty datasource.
            final JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(Collections.singletonList("Invoice"));

            // Render the PDF file
            JasperReportsUtils.renderAsPdf(report, parameters, dataSource, pos);

            return pdfFile;
        }
        catch (final Exception e)
        {
            log.error(String.format("An error occured during PDF creation: %s", e));
        }
        return pdfFile;
    }

    private JasperReport loadTemplate() throws JRException {

        log.info(String.format("Invoice template path : %s", invoice_template_path));

        final InputStream reportInputStream = getClass().getResourceAsStream(invoice_template_path);
        final JasperDesign jasperDesign = JRXmlLoader.load(reportInputStream);

        return JasperCompileManager.compileReport(jasperDesign);
    }

    private Map<String, Object> parameters(Invoice order, Locale locale) {
        final Map<String, Object> parameters = new HashMap<>();

        parameters.put("logo", getClass().getResourceAsStream(logo_path));
        parameters.put("order",  order);
        parameters.put("REPORT_LOCALE", locale);

        return parameters;
    }
}
