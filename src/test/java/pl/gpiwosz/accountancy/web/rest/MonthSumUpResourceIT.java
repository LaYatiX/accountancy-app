package pl.gpiwosz.accountancy.web.rest;

import pl.gpiwosz.accountancy.AccountancyApp;
import pl.gpiwosz.accountancy.domain.MonthSumUp;
import pl.gpiwosz.accountancy.repository.MonthSumUpRepository;
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
 * Integration tests for the {@Link MonthSumUpResource} REST controller.
 */
@SpringBootTest(classes = AccountancyApp.class)
public class MonthSumUpResourceIT {

    private static final Float DEFAULT_INCOME_SUM = 1F;
    private static final Float UPDATED_INCOME_SUM = 2F;

    private static final Float DEFAULT_EXPENSE_SUM = 1F;
    private static final Float UPDATED_EXPENSE_SUM = 2F;

    private static final Float DEFAULT_SOCIAL_INSURANCE = 1F;
    private static final Float UPDATED_SOCIAL_INSURANCE = 2F;

    private static final Float DEFAULT_HEALTH_CONTRIBUTION = 1F;
    private static final Float UPDATED_HEALTH_CONTRIBUTION = 2F;

    private static final Float DEFAULT_FUND_WORD = 1F;
    private static final Float UPDATED_FUND_WORD = 2F;

    private static final Float DEFAULT_Z_U_SSUM = 1F;
    private static final Float UPDATED_Z_U_SSUM = 2F;

    private static final Float DEFAULT_INCOME_TAX = 1F;
    private static final Float UPDATED_INCOME_TAX = 2F;

    @Autowired
    private MonthSumUpRepository monthSumUpRepository;

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

    private MockMvc restMonthSumUpMockMvc;

    private MonthSumUp monthSumUp;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MonthSumUpResource monthSumUpResource = new MonthSumUpResource(monthSumUpRepository);
        this.restMonthSumUpMockMvc = MockMvcBuilders.standaloneSetup(monthSumUpResource)
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
    public static MonthSumUp createEntity(EntityManager em) {
        MonthSumUp monthSumUp = new MonthSumUp()
            .incomeSum(DEFAULT_INCOME_SUM)
            .expenseSum(DEFAULT_EXPENSE_SUM)
            .socialInsurance(DEFAULT_SOCIAL_INSURANCE)
            .healthContribution(DEFAULT_HEALTH_CONTRIBUTION)
            .fundWord(DEFAULT_FUND_WORD)
            .zUSsum(DEFAULT_Z_U_SSUM)
            .incomeTax(DEFAULT_INCOME_TAX);
        return monthSumUp;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MonthSumUp createUpdatedEntity(EntityManager em) {
        MonthSumUp monthSumUp = new MonthSumUp()
            .incomeSum(UPDATED_INCOME_SUM)
            .expenseSum(UPDATED_EXPENSE_SUM)
            .socialInsurance(UPDATED_SOCIAL_INSURANCE)
            .healthContribution(UPDATED_HEALTH_CONTRIBUTION)
            .fundWord(UPDATED_FUND_WORD)
            .zUSsum(UPDATED_Z_U_SSUM)
            .incomeTax(UPDATED_INCOME_TAX);
        return monthSumUp;
    }

    @BeforeEach
    public void initTest() {
        monthSumUp = createEntity(em);
    }

    @Test
    @Transactional
    public void createMonthSumUp() throws Exception {
        int databaseSizeBeforeCreate = monthSumUpRepository.findAll().size();

        // Create the MonthSumUp
        restMonthSumUpMockMvc.perform(post("/api/month-sum-ups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(monthSumUp)))
            .andExpect(status().isCreated());

        // Validate the MonthSumUp in the database
        List<MonthSumUp> monthSumUpList = monthSumUpRepository.findAll();
        assertThat(monthSumUpList).hasSize(databaseSizeBeforeCreate + 1);
        MonthSumUp testMonthSumUp = monthSumUpList.get(monthSumUpList.size() - 1);
        assertThat(testMonthSumUp.getIncomeSum()).isEqualTo(DEFAULT_INCOME_SUM);
        assertThat(testMonthSumUp.getExpenseSum()).isEqualTo(DEFAULT_EXPENSE_SUM);
        assertThat(testMonthSumUp.getSocialInsurance()).isEqualTo(DEFAULT_SOCIAL_INSURANCE);
        assertThat(testMonthSumUp.getHealthContribution()).isEqualTo(DEFAULT_HEALTH_CONTRIBUTION);
        assertThat(testMonthSumUp.getFundWord()).isEqualTo(DEFAULT_FUND_WORD);
        assertThat(testMonthSumUp.getzUSsum()).isEqualTo(DEFAULT_Z_U_SSUM);
        assertThat(testMonthSumUp.getIncomeTax()).isEqualTo(DEFAULT_INCOME_TAX);
    }

    @Test
    @Transactional
    public void createMonthSumUpWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = monthSumUpRepository.findAll().size();

        // Create the MonthSumUp with an existing ID
        monthSumUp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMonthSumUpMockMvc.perform(post("/api/month-sum-ups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(monthSumUp)))
            .andExpect(status().isBadRequest());

        // Validate the MonthSumUp in the database
        List<MonthSumUp> monthSumUpList = monthSumUpRepository.findAll();
        assertThat(monthSumUpList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMonthSumUps() throws Exception {
        // Initialize the database
        monthSumUpRepository.saveAndFlush(monthSumUp);

        // Get all the monthSumUpList
        restMonthSumUpMockMvc.perform(get("/api/month-sum-ups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(monthSumUp.getId().intValue())))
            .andExpect(jsonPath("$.[*].incomeSum").value(hasItem(DEFAULT_INCOME_SUM.doubleValue())))
            .andExpect(jsonPath("$.[*].expenseSum").value(hasItem(DEFAULT_EXPENSE_SUM.doubleValue())))
            .andExpect(jsonPath("$.[*].socialInsurance").value(hasItem(DEFAULT_SOCIAL_INSURANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].healthContribution").value(hasItem(DEFAULT_HEALTH_CONTRIBUTION.doubleValue())))
            .andExpect(jsonPath("$.[*].fundWord").value(hasItem(DEFAULT_FUND_WORD.doubleValue())))
            .andExpect(jsonPath("$.[*].zUSsum").value(hasItem(DEFAULT_Z_U_SSUM.doubleValue())))
            .andExpect(jsonPath("$.[*].incomeTax").value(hasItem(DEFAULT_INCOME_TAX.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getMonthSumUp() throws Exception {
        // Initialize the database
        monthSumUpRepository.saveAndFlush(monthSumUp);

        // Get the monthSumUp
        restMonthSumUpMockMvc.perform(get("/api/month-sum-ups/{id}", monthSumUp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(monthSumUp.getId().intValue()))
            .andExpect(jsonPath("$.incomeSum").value(DEFAULT_INCOME_SUM.doubleValue()))
            .andExpect(jsonPath("$.expenseSum").value(DEFAULT_EXPENSE_SUM.doubleValue()))
            .andExpect(jsonPath("$.socialInsurance").value(DEFAULT_SOCIAL_INSURANCE.doubleValue()))
            .andExpect(jsonPath("$.healthContribution").value(DEFAULT_HEALTH_CONTRIBUTION.doubleValue()))
            .andExpect(jsonPath("$.fundWord").value(DEFAULT_FUND_WORD.doubleValue()))
            .andExpect(jsonPath("$.zUSsum").value(DEFAULT_Z_U_SSUM.doubleValue()))
            .andExpect(jsonPath("$.incomeTax").value(DEFAULT_INCOME_TAX.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMonthSumUp() throws Exception {
        // Get the monthSumUp
        restMonthSumUpMockMvc.perform(get("/api/month-sum-ups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMonthSumUp() throws Exception {
        // Initialize the database
        monthSumUpRepository.saveAndFlush(monthSumUp);

        int databaseSizeBeforeUpdate = monthSumUpRepository.findAll().size();

        // Update the monthSumUp
        MonthSumUp updatedMonthSumUp = monthSumUpRepository.findById(monthSumUp.getId()).get();
        // Disconnect from session so that the updates on updatedMonthSumUp are not directly saved in db
        em.detach(updatedMonthSumUp);
        updatedMonthSumUp
            .incomeSum(UPDATED_INCOME_SUM)
            .expenseSum(UPDATED_EXPENSE_SUM)
            .socialInsurance(UPDATED_SOCIAL_INSURANCE)
            .healthContribution(UPDATED_HEALTH_CONTRIBUTION)
            .fundWord(UPDATED_FUND_WORD)
            .zUSsum(UPDATED_Z_U_SSUM)
            .incomeTax(UPDATED_INCOME_TAX);

        restMonthSumUpMockMvc.perform(put("/api/month-sum-ups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMonthSumUp)))
            .andExpect(status().isOk());

        // Validate the MonthSumUp in the database
        List<MonthSumUp> monthSumUpList = monthSumUpRepository.findAll();
        assertThat(monthSumUpList).hasSize(databaseSizeBeforeUpdate);
        MonthSumUp testMonthSumUp = monthSumUpList.get(monthSumUpList.size() - 1);
        assertThat(testMonthSumUp.getIncomeSum()).isEqualTo(UPDATED_INCOME_SUM);
        assertThat(testMonthSumUp.getExpenseSum()).isEqualTo(UPDATED_EXPENSE_SUM);
        assertThat(testMonthSumUp.getSocialInsurance()).isEqualTo(UPDATED_SOCIAL_INSURANCE);
        assertThat(testMonthSumUp.getHealthContribution()).isEqualTo(UPDATED_HEALTH_CONTRIBUTION);
        assertThat(testMonthSumUp.getFundWord()).isEqualTo(UPDATED_FUND_WORD);
        assertThat(testMonthSumUp.getzUSsum()).isEqualTo(UPDATED_Z_U_SSUM);
        assertThat(testMonthSumUp.getIncomeTax()).isEqualTo(UPDATED_INCOME_TAX);
    }

    @Test
    @Transactional
    public void updateNonExistingMonthSumUp() throws Exception {
        int databaseSizeBeforeUpdate = monthSumUpRepository.findAll().size();

        // Create the MonthSumUp

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMonthSumUpMockMvc.perform(put("/api/month-sum-ups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(monthSumUp)))
            .andExpect(status().isBadRequest());

        // Validate the MonthSumUp in the database
        List<MonthSumUp> monthSumUpList = monthSumUpRepository.findAll();
        assertThat(monthSumUpList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMonthSumUp() throws Exception {
        // Initialize the database
        monthSumUpRepository.saveAndFlush(monthSumUp);

        int databaseSizeBeforeDelete = monthSumUpRepository.findAll().size();

        // Delete the monthSumUp
        restMonthSumUpMockMvc.perform(delete("/api/month-sum-ups/{id}", monthSumUp.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<MonthSumUp> monthSumUpList = monthSumUpRepository.findAll();
        assertThat(monthSumUpList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MonthSumUp.class);
        MonthSumUp monthSumUp1 = new MonthSumUp();
        monthSumUp1.setId(1L);
        MonthSumUp monthSumUp2 = new MonthSumUp();
        monthSumUp2.setId(monthSumUp1.getId());
        assertThat(monthSumUp1).isEqualTo(monthSumUp2);
        monthSumUp2.setId(2L);
        assertThat(monthSumUp1).isNotEqualTo(monthSumUp2);
        monthSumUp1.setId(null);
        assertThat(monthSumUp1).isNotEqualTo(monthSumUp2);
    }
}
