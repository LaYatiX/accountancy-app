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
 * A Income.
 */
@Entity
@Table(name = "income")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Income implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @OneToMany(mappedBy = "income", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnoreProperties({"expenses", "income"})
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

    public Income date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<Entry> getEntries() {
        return entries;
    }

    public Income entries(Set<Entry> entries) {
        this.entries = entries;
        return this;
    }

    public Income addEntry(Entry entry) {
        this.entries.add(entry);
        entry.setIncome(this);
        return this;
    }

    public Income removeEntry(Entry entry) {
        this.entries.remove(entry);
        entry.setIncome(null);
        return this;
    }

    public void setEntries(Set<Entry> entries) {
        this.entries = entries;
    }

    public MonthSumUp getMonthSumUp() {
        return monthSumUp;
    }

    public Income monthSumUp(MonthSumUp monthSumUp) {
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
        if (!(o instanceof Income)) {
            return false;
        }
        return id != null && id.equals(((Income) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Income{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
