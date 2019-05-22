package pl.gpiwosz.accountancy.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "price_netto")
    private Float priceNetto;

    @Column(name = "v_at")
    private Long vAT;

    @Column(name = "price_brutto")
    private Float priceBrutto;

    @ManyToMany(mappedBy = "products")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Invoice> invoices = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getQuantity() {
        return quantity;
    }

    public Product quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Float getPriceNetto() {
        return priceNetto;
    }

    public Product priceNetto(Float priceNetto) {
        this.priceNetto = priceNetto;
        return this;
    }

    public void setPriceNetto(Float priceNetto) {
        this.priceNetto = priceNetto;
    }

    public Long getvAT() {
        return vAT;
    }

    public Product vAT(Long vAT) {
        this.vAT = vAT;
        return this;
    }

    public void setvAT(Long vAT) {
        this.vAT = vAT;
    }

    public Float getPriceBrutto() {
        return priceBrutto;
    }

    public Product priceBrutto(Float priceBrutto) {
        this.priceBrutto = priceBrutto;
        return this;
    }

    public void setPriceBrutto(Float priceBrutto) {
        this.priceBrutto = priceBrutto;
    }

    public Set<Invoice> getInvoices() {
        return invoices;
    }

    public Product invoices(Set<Invoice> invoices) {
        this.invoices = invoices;
        return this;
    }

    public Product addInvoice(Invoice invoice) {
        this.invoices.add(invoice);
        invoice.getProducts().add(this);
        return this;
    }

    public Product removeInvoice(Invoice invoice) {
        this.invoices.remove(invoice);
        invoice.getProducts().remove(this);
        return this;
    }

    public void setInvoices(Set<Invoice> invoices) {
        this.invoices = invoices;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", quantity=" + getQuantity() +
            ", priceNetto=" + getPriceNetto() +
            ", vAT=" + getvAT() +
            ", priceBrutto=" + getPriceBrutto() +
            "}";
    }
}
