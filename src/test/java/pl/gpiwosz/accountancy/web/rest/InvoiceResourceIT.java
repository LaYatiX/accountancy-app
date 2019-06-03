package pl.gpiwosz.accountancy.web.rest;

import pl.gpiwosz.accountancy.AccountancyApp;
import pl.gpiwosz.accountancy.domain.Invoice;
import pl.gpiwosz.accountancy.repository.EntryRepository;
import pl.gpiwosz.accountancy.repository.InvoiceRepository;
import pl.gpiwosz.accountancy.repository.ProductRepository;
import pl.gpiwosz.accountancy.service.MailService;
import pl.gpiwosz.accountancy.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static pl.gpiwosz.accountancy.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link InvoiceResource} REST controller.
 */
@SpringBootTest(classes = AccountancyApp.class)
public class InvoiceResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NUMBER = "1L";
    private static final String UPDATED_NUMBER = "2L";

    private static final LocalDate DEFAULT_DOCUMENT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DOCUMENT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_SELL_PLACE = "AAAAAAAAAA";
    private static final String UPDATED_SELL_PLACE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_SELL_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_SELL_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_BANK_ACCOUNT = "AAAAAAAAAA";
    private static final String UPDATED_BANK_ACCOUNT = "BBBBBBBBBB";

    private static final Float DEFAULT_TOTAL_NETTO = 1F;
    private static final Float UPDATED_TOTAL_NETTO = 2F;

    private static final Float DEFAULT_TOTAL_VAT = 1F;
    private static final Float UPDATED_TOTAL_VAT = 2F;

    private static final Float DEFAULT_TOTAL_BRUTTO = 1F;
    private static final Float UPDATED_TOTAL_BRUTTO = 2F;

    private static final String DEFAULT_PAYMENT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_PAYMENT_TYPE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_PAYMENT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PAYMENT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_PAYMENT_DUE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PAYMENT_DUE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    private static final Long DEFAULT_SIZE = 1L;
    private static final Long UPDATED_SIZE = 2L;

    private static final String DEFAULT_MIME_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_MIME_TYPE = "BBBBBBBBBB";

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EntryRepository entryRepository;

    @Autowired
    private MailService mailService;

    @Mock
    private InvoiceRepository invoiceRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restInvoiceMockMvc;

    private Invoice invoice;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InvoiceResource invoiceResource = new InvoiceResource(invoiceRepository, productRepository, entryRepository, mailService);
        this.restInvoiceMockMvc = MockMvcBuilders.standaloneSetup(invoiceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Invoice createEntity(EntityManager em) {
        Invoice invoice = new Invoice()
            .name(DEFAULT_NAME)
            .number(DEFAULT_NUMBER)
            .documentDate(DEFAULT_DOCUMENT_DATE)
            .sellPlace(DEFAULT_SELL_PLACE)
            .sellDate(DEFAULT_SELL_DATE)
            .bankAccount(DEFAULT_BANK_ACCOUNT)
            .totalNetto(DEFAULT_TOTAL_NETTO)
            .totalVat(DEFAULT_TOTAL_VAT)
            .totalBrutto(DEFAULT_TOTAL_BRUTTO)
            .paymentType(DEFAULT_PAYMENT_TYPE)
            .paymentDate(DEFAULT_PAYMENT_DATE)
            .paymentDueDate(DEFAULT_PAYMENT_DUE_DATE)
            .notes(DEFAULT_NOTES)
            .size(DEFAULT_SIZE)
            .mimeType(DEFAULT_MIME_TYPE);
        return invoice;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Invoice createUpdatedEntity(EntityManager em) {
        Invoice invoice = new Invoice()
            .name(UPDATED_NAME)
            .number(UPDATED_NUMBER)
            .documentDate(UPDATED_DOCUMENT_DATE)
            .sellPlace(UPDATED_SELL_PLACE)
            .sellDate(UPDATED_SELL_DATE)
            .bankAccount(UPDATED_BANK_ACCOUNT)
            .totalNetto(UPDATED_TOTAL_NETTO)
            .totalVat(UPDATED_TOTAL_VAT)
            .totalBrutto(UPDATED_TOTAL_BRUTTO)
            .paymentType(UPDATED_PAYMENT_TYPE)
            .paymentDate(UPDATED_PAYMENT_DATE)
            .paymentDueDate(UPDATED_PAYMENT_DUE_DATE)
            .notes(UPDATED_NOTES)
            .size(UPDATED_SIZE)
            .mimeType(UPDATED_MIME_TYPE);
        return invoice;
    }

    @BeforeEach
    public void initTest() {
        invoice = createEntity(em);
    }

    @Test
    @Transactional
    public void createInvoice() throws Exception {
        int databaseSizeBeforeCreate = invoiceRepository.findAll().size();

        // Create the Invoice
        restInvoiceMockMvc.perform(post("/api/invoices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isCreated());

        // Validate the Invoice in the database
        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeCreate + 1);
        Invoice testInvoice = invoiceList.get(invoiceList.size() - 1);
        assertThat(testInvoice.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testInvoice.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testInvoice.getDocumentDate()).isEqualTo(DEFAULT_DOCUMENT_DATE);
        assertThat(testInvoice.getSellPlace()).isEqualTo(DEFAULT_SELL_PLACE);
        assertThat(testInvoice.getSellDate()).isEqualTo(DEFAULT_SELL_DATE);
        assertThat(testInvoice.getBankAccount()).isEqualTo(DEFAULT_BANK_ACCOUNT);
        assertThat(testInvoice.getTotalNetto()).isEqualTo(DEFAULT_TOTAL_NETTO);
        assertThat(testInvoice.getTotalVat()).isEqualTo(DEFAULT_TOTAL_VAT);
        assertThat(testInvoice.getTotalBrutto()).isEqualTo(DEFAULT_TOTAL_BRUTTO);
        assertThat(testInvoice.getPaymentType()).isEqualTo(DEFAULT_PAYMENT_TYPE);
        assertThat(testInvoice.getPaymentDate()).isEqualTo(DEFAULT_PAYMENT_DATE);
        assertThat(testInvoice.getPaymentDueDate()).isEqualTo(DEFAULT_PAYMENT_DUE_DATE);
        assertThat(testInvoice.getNotes()).isEqualTo(DEFAULT_NOTES);
        assertThat(testInvoice.getSize()).isEqualTo(DEFAULT_SIZE);
        assertThat(testInvoice.getMimeType()).isEqualTo(DEFAULT_MIME_TYPE);
    }

    @Test
    @Transactional
    public void createInvoiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = invoiceRepository.findAll().size();

        // Create the Invoice with an existing ID
        invoice.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInvoiceMockMvc.perform(post("/api/invoices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isBadRequest());

        // Validate the Invoice in the database
        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = invoiceRepository.findAll().size();
        // set the field null
        invoice.setName(null);

        // Create the Invoice, which fails.

        restInvoiceMockMvc.perform(post("/api/invoices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isBadRequest());

        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSizeIsRequired() throws Exception {
        int databaseSizeBeforeTest = invoiceRepository.findAll().size();
        // set the field null
        invoice.setSize(null);

        // Create the Invoice, which fails.

        restInvoiceMockMvc.perform(post("/api/invoices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isBadRequest());

        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInvoices() throws Exception {
        // Initialize the database
        invoiceRepository.saveAndFlush(invoice);

        // Get all the companyList
        restInvoiceMockMvc.perform(get("/api/invoices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(invoice.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].documentDate").value(hasItem(DEFAULT_DOCUMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].sellPlace").value(hasItem(DEFAULT_SELL_PLACE.toString())))
            .andExpect(jsonPath("$.[*].sellDate").value(hasItem(DEFAULT_SELL_DATE.toString())))
            .andExpect(jsonPath("$.[*].bankAccount").value(hasItem(DEFAULT_BANK_ACCOUNT.toString())))
            .andExpect(jsonPath("$.[*].totalNetto").value(hasItem(DEFAULT_TOTAL_NETTO.doubleValue())))
            .andExpect(jsonPath("$.[*].totalVat").value(hasItem(DEFAULT_TOTAL_VAT.doubleValue())))
            .andExpect(jsonPath("$.[*].totalBrutto").value(hasItem(DEFAULT_TOTAL_BRUTTO.doubleValue())))
            .andExpect(jsonPath("$.[*].paymentType").value(hasItem(DEFAULT_PAYMENT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].paymentDate").value(hasItem(DEFAULT_PAYMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].paymentDueDate").value(hasItem(DEFAULT_PAYMENT_DUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())))
            .andExpect(jsonPath("$.[*].size").value(hasItem(DEFAULT_SIZE.intValue())))
            .andExpect(jsonPath("$.[*].mimeType").value(hasItem(DEFAULT_MIME_TYPE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllInvoicesWithEagerRelationshipsIsEnabled() throws Exception {
        InvoiceResource invoiceResource = new InvoiceResource(invoiceRepositoryMock, productRepository, entryRepository, mailService);
        when(invoiceRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restInvoiceMockMvc = MockMvcBuilders.standaloneSetup(invoiceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restInvoiceMockMvc.perform(get("/api/invoices?eagerload=true"))
        .andExpect(status().isOk());

        verify(invoiceRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllInvoicesWithEagerRelationshipsIsNotEnabled() throws Exception {
        InvoiceResource invoiceResource = new InvoiceResource(invoiceRepositoryMock, productRepository, entryRepository, mailService);
            when(invoiceRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restInvoiceMockMvc = MockMvcBuilders.standaloneSetup(invoiceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restInvoiceMockMvc.perform(get("/api/invoices?eagerload=true"))
        .andExpect(status().isOk());

            verify(invoiceRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getInvoice() throws Exception {
        // Initialize the database
        invoiceRepository.saveAndFlush(invoice);

        // Get the invoice
        restInvoiceMockMvc.perform(get("/api/invoices/{id}", invoice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(invoice.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()))
            .andExpect(jsonPath("$.documentDate").value(DEFAULT_DOCUMENT_DATE.toString()))
            .andExpect(jsonPath("$.sellPlace").value(DEFAULT_SELL_PLACE.toString()))
            .andExpect(jsonPath("$.sellDate").value(DEFAULT_SELL_DATE.toString()))
            .andExpect(jsonPath("$.bankAccount").value(DEFAULT_BANK_ACCOUNT.toString()))
            .andExpect(jsonPath("$.totalNetto").value(DEFAULT_TOTAL_NETTO.doubleValue()))
            .andExpect(jsonPath("$.totalVat").value(DEFAULT_TOTAL_VAT.doubleValue()))
            .andExpect(jsonPath("$.totalBrutto").value(DEFAULT_TOTAL_BRUTTO.doubleValue()))
            .andExpect(jsonPath("$.paymentType").value(DEFAULT_PAYMENT_TYPE.toString()))
            .andExpect(jsonPath("$.paymentDate").value(DEFAULT_PAYMENT_DATE.toString()))
            .andExpect(jsonPath("$.paymentDueDate").value(DEFAULT_PAYMENT_DUE_DATE.toString()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES.toString()))
            .andExpect(jsonPath("$.size").value(DEFAULT_SIZE.intValue()))
            .andExpect(jsonPath("$.mimeType").value(DEFAULT_MIME_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInvoice() throws Exception {
        // Get the invoice
        restInvoiceMockMvc.perform(get("/api/invoices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInvoice() throws Exception {
        // Initialize the database
        invoiceRepository.saveAndFlush(invoice);

        int databaseSizeBeforeUpdate = invoiceRepository.findAll().size();

        // Update the invoice
        Invoice updatedInvoice = invoiceRepository.findById(invoice.getId()).get();
        // Disconnect from session so that the updates on updatedInvoice are not directly saved in db
        em.detach(updatedInvoice);
        updatedInvoice
            .name(UPDATED_NAME)
            .number(UPDATED_NUMBER)
            .documentDate(UPDATED_DOCUMENT_DATE)
            .sellPlace(UPDATED_SELL_PLACE)
            .sellDate(UPDATED_SELL_DATE)
            .bankAccount(UPDATED_BANK_ACCOUNT)
            .totalNetto(UPDATED_TOTAL_NETTO)
            .totalVat(UPDATED_TOTAL_VAT)
            .totalBrutto(UPDATED_TOTAL_BRUTTO)
            .paymentType(UPDATED_PAYMENT_TYPE)
            .paymentDate(UPDATED_PAYMENT_DATE)
            .paymentDueDate(UPDATED_PAYMENT_DUE_DATE)
            .notes(UPDATED_NOTES)
            .size(UPDATED_SIZE)
            .mimeType(UPDATED_MIME_TYPE);

        restInvoiceMockMvc.perform(put("/api/invoices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInvoice)))
            .andExpect(status().isOk());

        // Validate the Invoice in the database
        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeUpdate);
        Invoice testInvoice = invoiceList.get(invoiceList.size() - 1);
        assertThat(testInvoice.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testInvoice.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testInvoice.getDocumentDate()).isEqualTo(UPDATED_DOCUMENT_DATE);
        assertThat(testInvoice.getSellPlace()).isEqualTo(UPDATED_SELL_PLACE);
        assertThat(testInvoice.getSellDate()).isEqualTo(UPDATED_SELL_DATE);
        assertThat(testInvoice.getBankAccount()).isEqualTo(UPDATED_BANK_ACCOUNT);
        assertThat(testInvoice.getTotalNetto()).isEqualTo(UPDATED_TOTAL_NETTO);
        assertThat(testInvoice.getTotalVat()).isEqualTo(UPDATED_TOTAL_VAT);
        assertThat(testInvoice.getTotalBrutto()).isEqualTo(UPDATED_TOTAL_BRUTTO);
        assertThat(testInvoice.getPaymentType()).isEqualTo(UPDATED_PAYMENT_TYPE);
        assertThat(testInvoice.getPaymentDate()).isEqualTo(UPDATED_PAYMENT_DATE);
        assertThat(testInvoice.getPaymentDueDate()).isEqualTo(UPDATED_PAYMENT_DUE_DATE);
        assertThat(testInvoice.getNotes()).isEqualTo(UPDATED_NOTES);
        assertThat(testInvoice.getSize()).isEqualTo(UPDATED_SIZE);
        assertThat(testInvoice.getMimeType()).isEqualTo(UPDATED_MIME_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingInvoice() throws Exception {
        int databaseSizeBeforeUpdate = invoiceRepository.findAll().size();

        // Create the Invoice

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvoiceMockMvc.perform(put("/api/invoices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isBadRequest());

        // Validate the Invoice in the database
        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInvoice() throws Exception {
        // Initialize the database
        invoiceRepository.saveAndFlush(invoice);

        int databaseSizeBeforeDelete = invoiceRepository.findAll().size();

        // Delete the invoice
        restInvoiceMockMvc.perform(delete("/api/invoices/{id}", invoice.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Invoice.class);
        Invoice invoice1 = new Invoice();
        invoice1.setId(1L);
        Invoice invoice2 = new Invoice();
        invoice2.setId(invoice1.getId());
        assertThat(invoice1).isEqualTo(invoice2);
        invoice2.setId(2L);
        assertThat(invoice1).isNotEqualTo(invoice2);
        invoice1.setId(null);
        assertThat(invoice1).isNotEqualTo(invoice2);
    }
}
