package pl.gpiwosz.accountancy.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A MonthSumUp.
 */
@Entity
@Table(name = "month_sum_up")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MonthSumUp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    private LocalDate month;

    @Column(name = "income_sum")
    private Float incomeSum;

    @Column(name = "expense_sum")
    private Float expenseSum;

    @Column(name = "social_insurance")
    private Float socialInsurance;

    @Column(name = "health_contribution")
    private Float healthContribution;

    @Column(name = "fund_word")
    private Float fundWord;

    @Column(name = "z_u_ssum")
    private Float zUSsum;

    @Column(name = "income_tax")
    private Float incomeTax;

    @OneToOne(mappedBy = "monthSumUp", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnoreProperties("monthSumUp")
    private Expense expenses;

    @OneToOne(mappedBy = "monthSumUp", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnoreProperties("monthSumUp")
    private Income incomes;

    @ManyToOne
    private Company company;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getIncomeSum() {
        return incomeSum;
    }

    public MonthSumUp incomeSum(Float incomeSum) {
        this.incomeSum = incomeSum;
        return this;
    }

    public void setIncomeSum(Float incomeSum) {
        this.incomeSum = incomeSum;
    }

    public Float getExpenseSum() {
        return expenseSum;
    }

    public MonthSumUp expenseSum(Float expenseSum) {
        this.expenseSum = expenseSum;
        return this;
    }

    public void setExpenseSum(Float expenseSum) {
        this.expenseSum = expenseSum;
    }

    public Float getSocialInsurance() {
        return socialInsurance;
    }

    public MonthSumUp socialInsurance(Float socialInsurance) {
        this.socialInsurance = socialInsurance;
        return this;
    }

    public void setSocialInsurance(Float socialInsurance) {
        this.socialInsurance = socialInsurance;
    }

    public Float getHealthContribution() {
        return healthContribution;
    }

    public MonthSumUp healthContribution(Float healthContribution) {
        this.healthContribution = healthContribution;
        return this;
    }

    public void setHealthContribution(Float healthContribution) {
        this.healthContribution = healthContribution;
    }

    public Float getFundWord() {
        return fundWord;
    }

    public MonthSumUp fundWord(Float fundWord) {
        this.fundWord = fundWord;
        return this;
    }

    public void setFundWord(Float fundWord) {
        this.fundWord = fundWord;
    }

    public Float getzUSsum() {
        return zUSsum;
    }

    public MonthSumUp zUSsum(Float zUSsum) {
        this.zUSsum = zUSsum;
        return this;
    }

    public void setzUSsum(Float zUSsum) {
        this.zUSsum = zUSsum;
    }

    public Float getIncomeTax() {
        return incomeTax;
    }

    public MonthSumUp incomeTax(Float incomeTax) {
        this.incomeTax = incomeTax;
        return this;
    }

    public void setIncomeTax(Float incomeTax) {
        this.incomeTax = incomeTax;
    }

    public Expense getExpenses() {
        return expenses;
    }

    public MonthSumUp expenses(Expense expenses) {
        this.expenses = expenses;
        return this;
    }

    public void setExpenses(Expense expenses) {
        this.expenses = expenses;
    }

    public Income getIncomes() {
        return incomes;
    }

    public MonthSumUp incomes(Income incomes) {
        this.incomes = incomes;
        return this;
    }

    public void setIncomes(Income incomes) {
        this.incomes = incomes;
    }

    public Company getCompany() {
        return company;
    }

    public MonthSumUp company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MonthSumUp)) {
            return false;
        }
        return id != null && id.equals(((MonthSumUp) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MonthSumUp{" +
            "id=" + getId() +
            ", incomeSum=" + getIncomeSum() +
            ", expenseSum=" + getExpenseSum() +
            ", socialInsurance=" + getSocialInsurance() +
            ", healthContribution=" + getHealthContribution() +
            ", fundWord=" + getFundWord() +
            ", zUSsum=" + getzUSsum() +
            ", incomeTax=" + getIncomeTax() +
            "}";
    }

    public LocalDate getMonth() {
        return month;
    }

    public void setMonth(LocalDate month) {
        this.month = month;
    }
}
