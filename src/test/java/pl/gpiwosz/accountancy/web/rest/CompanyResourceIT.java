package pl.gpiwosz.accountancy.web.rest;

import pl.gpiwosz.accountancy.AccountancyApp;
import pl.gpiwosz.accountancy.domain.Company;
import pl.gpiwosz.accountancy.repository.CompanyRepository;
import pl.gpiwosz.accountancy.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static pl.gpiwosz.accountancy.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link CompanyResource} REST controller.
 */
@SpringBootTest(classes = AccountancyApp.class)
public class CompanyResourceIT {

    private static final String DEFAULT_COMPANY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SHORT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_N_IP = "AAAAAAAAAA";
    private static final String UPDATED_N_IP = "BBBBBBBBBB";

    private static final Long DEFAULT_PHONE = 1L;
    private static final Long UPDATED_PHONE = 2L;

    private static final String DEFAULT_FORM_OF_TAXATION = "AAAAAAAAAA";
    private static final String UPDATED_FORM_OF_TAXATION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_V_A_TPAYER = false;
    private static final Boolean UPDATED_V_A_TPAYER = true;

    private static final Boolean DEFAULT_Z_U_SEASY_START = false;
    private static final Boolean UPDATED_Z_U_SEASY_START = true;

    private static final Boolean DEFAULT_Z_U_SMALL = false;
    private static final Boolean UPDATED_Z_U_SMALL = true;

    private static final Boolean DEFAULT_Z_U_SDISEASE = false;
    private static final Boolean UPDATED_Z_U_SDISEASE = true;

    private static final Boolean DEFAULT_IS_ZU_SPAYER = false;
    private static final Boolean UPDATED_IS_ZU_SPAYER = true;

    @Autowired
    private CompanyRepository companyRepository;

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

    private MockMvc restCompanyMockMvc;

    private Company company;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompanyResource companyResource = new CompanyResource(companyRepository);
        this.restCompanyMockMvc = MockMvcBuilders.standaloneSetup(companyResource)
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
    public static Company createEntity(EntityManager em) {
        Company company = new Company()
            .companyName(DEFAULT_COMPANY_NAME)
            .shortName(DEFAULT_SHORT_NAME)
            .name(DEFAULT_NAME)
            .surname(DEFAULT_SURNAME)
            .address(DEFAULT_ADDRESS)
            .postalCode(DEFAULT_POSTAL_CODE)
            .city(DEFAULT_CITY)
            .nIP(DEFAULT_N_IP)
            .phone(DEFAULT_PHONE)
            .formOfTaxation(DEFAULT_FORM_OF_TAXATION)
            .vATpayer(DEFAULT_V_A_TPAYER)
            .zUSeasyStart(DEFAULT_Z_U_SEASY_START)
            .zUSmall(DEFAULT_Z_U_SMALL)
            .zUSdisease(DEFAULT_Z_U_SDISEASE)
            .isZUSpayer(DEFAULT_IS_ZU_SPAYER);
        return company;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Company createUpdatedEntity(EntityManager em) {
        Company company = new Company()
            .companyName(UPDATED_COMPANY_NAME)
            .shortName(UPDATED_SHORT_NAME)
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .address(UPDATED_ADDRESS)
            .postalCode(UPDATED_POSTAL_CODE)
            .city(UPDATED_CITY)
            .nIP(UPDATED_N_IP)
            .phone(UPDATED_PHONE)
            .formOfTaxation(UPDATED_FORM_OF_TAXATION)
            .vATpayer(UPDATED_V_A_TPAYER)
            .zUSeasyStart(UPDATED_Z_U_SEASY_START)
            .zUSmall(UPDATED_Z_U_SMALL)
            .zUSdisease(UPDATED_Z_U_SDISEASE)
            .isZUSpayer(UPDATED_IS_ZU_SPAYER);
        return company;
    }

    @BeforeEach
    public void initTest() {
        company = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompany() throws Exception {
        int databaseSizeBeforeCreate = companyRepository.findAll().size();

        // Create the Company
        restCompanyMockMvc.perform(post("/api/invoices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(company)))
            .andExpect(status().isCreated());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeCreate + 1);
        Company testCompany = companyList.get(companyList.size() - 1);
        assertThat(testCompany.getCompanyName()).isEqualTo(DEFAULT_COMPANY_NAME);
        assertThat(testCompany.getShortName()).isEqualTo(DEFAULT_SHORT_NAME);
        assertThat(testCompany.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCompany.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testCompany.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testCompany.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testCompany.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testCompany.getnIP()).isEqualTo(DEFAULT_N_IP);
        assertThat(testCompany.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testCompany.getFormOfTaxation()).isEqualTo(DEFAULT_FORM_OF_TAXATION);
        assertThat(testCompany.isvATpayer()).isEqualTo(DEFAULT_V_A_TPAYER);
        assertThat(testCompany.iszUSeasyStart()).isEqualTo(DEFAULT_Z_U_SEASY_START);
        assertThat(testCompany.iszUSmall()).isEqualTo(DEFAULT_Z_U_SMALL);
        assertThat(testCompany.iszUSdisease()).isEqualTo(DEFAULT_Z_U_SDISEASE);
        assertThat(testCompany.isIsZUSpayer()).isEqualTo(DEFAULT_IS_ZU_SPAYER);
    }

    @Test
    @Transactional
    public void createCompanyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = companyRepository.findAll().size();

        // Create the Company with an existing ID
        company.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompanyMockMvc.perform(post("/api/invoices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(company)))
            .andExpect(status().isBadRequest());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCompanies() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get all the companyList
        restCompanyMockMvc.perform(get("/api/invoices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(company.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME.toString())))
            .andExpect(jsonPath("$.[*].shortName").value(hasItem(DEFAULT_SHORT_NAME.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].nIP").value(hasItem(DEFAULT_N_IP.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.intValue())))
            .andExpect(jsonPath("$.[*].formOfTaxation").value(hasItem(DEFAULT_FORM_OF_TAXATION.toString())))
            .andExpect(jsonPath("$.[*].vATpayer").value(hasItem(DEFAULT_V_A_TPAYER.booleanValue())))
            .andExpect(jsonPath("$.[*].zUSeasyStart").value(hasItem(DEFAULT_Z_U_SEASY_START.booleanValue())))
            .andExpect(jsonPath("$.[*].zUSmall").value(hasItem(DEFAULT_Z_U_SMALL.booleanValue())))
            .andExpect(jsonPath("$.[*].zUSdisease").value(hasItem(DEFAULT_Z_U_SDISEASE.booleanValue())))
            .andExpect(jsonPath("$.[*].isZUSpayer").value(hasItem(DEFAULT_IS_ZU_SPAYER.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getCompany() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        // Get the invoice
        restCompanyMockMvc.perform(get("/api/invoices/{id}", company.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(company.getId().intValue()))
            .andExpect(jsonPath("$.companyName").value(DEFAULT_COMPANY_NAME.toString()))
            .andExpect(jsonPath("$.shortName").value(DEFAULT_SHORT_NAME.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.nIP").value(DEFAULT_N_IP.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.intValue()))
            .andExpect(jsonPath("$.formOfTaxation").value(DEFAULT_FORM_OF_TAXATION.toString()))
            .andExpect(jsonPath("$.vATpayer").value(DEFAULT_V_A_TPAYER.booleanValue()))
            .andExpect(jsonPath("$.zUSeasyStart").value(DEFAULT_Z_U_SEASY_START.booleanValue()))
            .andExpect(jsonPath("$.zUSmall").value(DEFAULT_Z_U_SMALL.booleanValue()))
            .andExpect(jsonPath("$.zUSdisease").value(DEFAULT_Z_U_SDISEASE.booleanValue()))
            .andExpect(jsonPath("$.isZUSpayer").value(DEFAULT_IS_ZU_SPAYER.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCompany() throws Exception {
        // Get the invoice
        restCompanyMockMvc.perform(get("/api/invoices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompany() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        int databaseSizeBeforeUpdate = companyRepository.findAll().size();

        // Update the invoice
        Company updatedCompany = companyRepository.findById(company.getId()).get();
        // Disconnect from session so that the updates on updatedCompany are not directly saved in db
        em.detach(updatedCompany);
        updatedCompany
            .companyName(UPDATED_COMPANY_NAME)
            .shortName(UPDATED_SHORT_NAME)
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .address(UPDATED_ADDRESS)
            .postalCode(UPDATED_POSTAL_CODE)
            .city(UPDATED_CITY)
            .nIP(UPDATED_N_IP)
            .phone(UPDATED_PHONE)
            .formOfTaxation(UPDATED_FORM_OF_TAXATION)
            .vATpayer(UPDATED_V_A_TPAYER)
            .zUSeasyStart(UPDATED_Z_U_SEASY_START)
            .zUSmall(UPDATED_Z_U_SMALL)
            .zUSdisease(UPDATED_Z_U_SDISEASE)
            .isZUSpayer(UPDATED_IS_ZU_SPAYER);

        restCompanyMockMvc.perform(put("/api/invoices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompany)))
            .andExpect(status().isOk());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeUpdate);
        Company testCompany = companyList.get(companyList.size() - 1);
        assertThat(testCompany.getCompanyName()).isEqualTo(UPDATED_COMPANY_NAME);
        assertThat(testCompany.getShortName()).isEqualTo(UPDATED_SHORT_NAME);
        assertThat(testCompany.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCompany.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testCompany.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testCompany.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testCompany.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testCompany.getnIP()).isEqualTo(UPDATED_N_IP);
        assertThat(testCompany.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testCompany.getFormOfTaxation()).isEqualTo(UPDATED_FORM_OF_TAXATION);
        assertThat(testCompany.isvATpayer()).isEqualTo(UPDATED_V_A_TPAYER);
        assertThat(testCompany.iszUSeasyStart()).isEqualTo(UPDATED_Z_U_SEASY_START);
        assertThat(testCompany.iszUSmall()).isEqualTo(UPDATED_Z_U_SMALL);
        assertThat(testCompany.iszUSdisease()).isEqualTo(UPDATED_Z_U_SDISEASE);
        assertThat(testCompany.isIsZUSpayer()).isEqualTo(UPDATED_IS_ZU_SPAYER);
    }

    @Test
    @Transactional
    public void updateNonExistingCompany() throws Exception {
        int databaseSizeBeforeUpdate = companyRepository.findAll().size();

        // Create the Company

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompanyMockMvc.perform(put("/api/invoices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(company)))
            .andExpect(status().isBadRequest());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompany() throws Exception {
        // Initialize the database
        companyRepository.saveAndFlush(company);

        int databaseSizeBeforeDelete = companyRepository.findAll().size();

        // Delete the invoice
        restCompanyMockMvc.perform(delete("/api/invoices/{id}", company.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Company.class);
        Company company1 = new Company();
        company1.setId(1L);
        Company company2 = new Company();
        company2.setId(company1.getId());
        assertThat(company1).isEqualTo(company2);
        company2.setId(2L);
        assertThat(company1).isNotEqualTo(company2);
        company1.setId(null);
        assertThat(company1).isNotEqualTo(company2);
    }
}
