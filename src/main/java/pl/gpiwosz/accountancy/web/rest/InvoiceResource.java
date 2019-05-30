package pl.gpiwosz.accountancy.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import pl.gpiwosz.accountancy.domain.Invoice;
import pl.gpiwosz.accountancy.repository.InvoiceRepository;
import pl.gpiwosz.accountancy.repository.ProductRepository;
import pl.gpiwosz.accountancy.service.InvoiceService;
import pl.gpiwosz.accountancy.service.MailService;
import pl.gpiwosz.accountancy.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

/**
 * REST controller for managing {@link pl.gpiwosz.accountancy.domain.Invoice}.
 */
@RestController
@Transactional
@RequestMapping("/api")
public class InvoiceResource {

    private final Logger log = LoggerFactory.getLogger(InvoiceResource.class);

    private static final String ENTITY_NAME = "faktura";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InvoiceRepository invoiceRepository;

    private final ProductRepository productRepository;

    private final MailService mailService;

    @Autowired
    private InvoiceService invoiceService;

    public InvoiceResource(InvoiceRepository invoiceRepository, ProductRepository productRepository, MailService mailService) {
        this.invoiceRepository = invoiceRepository;
        this.productRepository = productRepository;
        this.mailService = mailService;
    }

    /**
     * {@code POST  /invoices} : Create a new invoice.
     *
     * @param invoice the invoice to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new invoice, or with status {@code 400 (Bad Request)} if the invoice has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/invoices")
    public ResponseEntity<Invoice> createInvoice(@Valid @RequestBody Invoice invoice) throws URISyntaxException {
        log.debug("REST request to save Invoice : {}", invoice);
        if (invoice.getId() != null) {
            throw new BadRequestAlertException("Taka faktura już istnieje", ENTITY_NAME, "idexists");
        }
        invoice.getProducts().forEach(s -> {
            s.setId(null);
            productRepository.save(s);
        });
        Invoice result = invoiceRepository.save(invoice);
        return ResponseEntity.created(new URI("/api/invoices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /invoices} : Updates an existing invoice.
     *
     * @param invoice the invoice to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated invoice,
     * or with status {@code 400 (Bad Request)} if the invoice is not valid,
     * or with status {@code 500 (Internal Server Error)} if the invoice couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/invoices")
    public ResponseEntity<Invoice> updateInvoice(@Valid @RequestBody Invoice invoice) throws URISyntaxException {
        log.debug("REST request to update Invoice : {}", invoice);
        if (invoice.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        invoice.getProducts().forEach(productRepository::save);

        Invoice result = invoiceRepository.save(invoice);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, invoice.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /invoices} : get all the invoices.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of invoices in body.
     */
    @GetMapping("/invoices")
    public List<Invoice> getAllInvoices(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Invoices");
        return invoiceRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /invoices} : get all the invoices as PDF
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of invoices in body.
     */
    @GetMapping(value = "/invoices/pdf/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<Resource> getInvoicePdf(@PathVariable Long id) {
        log.debug("REST request to get all Invoices");
        Invoice invoice = invoiceRepository.findOneWithEagerRelationships(id).get();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("content-disposition", "attachment; filename=Faktura" + invoice.getNumber()+".pdf");
//        responseHeaders.setContentType(MediaType.parseMediaType("application/octet-stream"));
        File file = null;
        ResponseEntity respEntity;
        try {
            file = invoiceService.generateInvoiceFor(invoice, Locale.ENGLISH);
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            return ResponseEntity.ok()
                .headers(responseHeaders)
                .contentLength(file.length())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resource);
        } catch (IOException e) {
            respEntity = new ResponseEntity("File Not Found", HttpStatus.OK);
            e.printStackTrace();
            return respEntity;
        }
    }

    @GetMapping(value = "/invoices/pdfsend/{id}")
    public ResponseEntity<Void> sendInvoicePdf(@PathVariable Long id, @RequestParam String email) {
        log.debug("REST request to get all Invoices");
        Invoice invoice = invoiceRepository.findOneWithEagerRelationships(id).get();
        File file = null;
        ResponseEntity respEntity;
        try {
            file = invoiceService.generateInvoiceFor(invoice, Locale.ENGLISH);
            String result = java.net.URLDecoder.decode(email, StandardCharsets.UTF_8.name());
            mailService.sendInvoiceMail(result, file);
            return new ResponseEntity<>( HttpStatus.OK );
        } catch (IOException e) {
            respEntity = new ResponseEntity("Nie znaleziono pliku", HttpStatus.OK);
            e.printStackTrace();
            return respEntity;
        }
    }


    /**
     * {@code GET  /invoices/:id} : get the "id" invoice.
     *
     * @param id the id of the invoice to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the invoice, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/invoices/{id}")
    public ResponseEntity<Invoice> getInvoice(@PathVariable Long id) {
        log.debug("REST request to get Invoice : {}", id);
        Optional<Invoice> invoice = invoiceRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(invoice);
    }

    /**
     * {@code DELETE  /invoices/:id} : delete the "id" invoice.
     *
     * @param id the id of the invoice to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/invoices/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
        log.debug("REST request to delete Invoice : {}", id);
        invoiceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
