package pl.gpiwosz.accountancy.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Entry.
 */
@Entity
@Table(name = "entry")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Entry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "description")
    private String description;

    @OneToOne
    private Invoice invoice;

    @ManyToOne
    @JsonIgnoreProperties("entries")
    private Expense expense;

    @ManyToOne
    @JsonIgnoreProperties("entries")
    private Income income;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAmount() {
        return amount;
    }

    public Entry amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public Entry description(String description) {
        this.description = description;
        return this;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Expense getExpense() {
        return expense;
    }

    public Entry expense(Expense expense) {
        this.expense = expense;
        return this;
    }

    public void setExpense(Expense expense) {
        this.expense = expense;
    }

    public Income getIncome() {
        return income;
    }

    public Entry income(Income income) {
        this.income = income;
        return this;
    }

    public void setIncome(Income income) {
        this.income = income;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Entry)) {
            return false;
        }
        return id != null && id.equals(((Entry) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Entry{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
