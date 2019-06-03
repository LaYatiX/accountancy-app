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
 * A Expense.
 */
@Entity
@Table(name = "expense")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Expense implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @OneToMany(mappedBy = "expense", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnoreProperties({"expense", "income"})
    private Set<Entry> entries = new HashSet<>();

    @OneToOne
    @JsonIgnoreProperties({"expenses", "incomes"})
    private MonthSumUp monthSumUp;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Expense date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<Entry> getEntries() {
        return entries;
    }

    public Expense entries(Set<Entry> entries) {
        this.entries = entries;
        return this;
    }

    public Expense addEntry(Entry entry) {
        this.entries.add(entry);
        entry.setExpense(this);
        return this;
    }

    public Expense removeEntry(Entry entry) {
        this.entries.remove(entry);
        entry.setExpense(null);
        return this;
    }

    public void setEntries(Set<Entry> entries) {
        this.entries = entries;
    }

    public MonthSumUp getMonthSumUp() {
        return monthSumUp;
    }

    public Expense monthSumUp(MonthSumUp monthSumUp) {
        this.monthSumUp = monthSumUp;
        return this;
    }

    public void setMonthSumUp(MonthSumUp monthSumUp) {
        this.monthSumUp = monthSumUp;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Expense)) {
            return false;
        }
        return id != null && id.equals(((Expense) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Expense{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
