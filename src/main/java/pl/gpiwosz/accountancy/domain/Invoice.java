package pl.gpiwosz.accountancy.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Invoice.
 */
@Entity
@Table(name = "invoice")
//@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Invoice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "jhi_number")
    private String number;

    @Column(name = "document_date")
    private LocalDate documentDate;

    @Column(name = "sell_place")
    private String sellPlace;

    @Column(name = "sell_date")
    private LocalDate sellDate;

    @Column(name = "bank_account")
    private String bankAccount;

    @Column(name = "total_netto", precision=10, scale=2)
    private Float totalNetto;

    @Column(name = "total_vat", precision=10, scale=2)
    private Float totalVat;

    @Column(name = "total_brutto", precision=10, scale=2)
    private Float totalBrutto;

    @Column(name = "payment_type")
    private String paymentType;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Column(name = "payment_due_date")
    private LocalDate paymentDueDate;

    @Column(name = "notes")
    private String notes;

    @Column(name = "jhi_size")
    private Long size;

    @Column(name = "mime_type")
    private String mimeType;

    @OneToOne
    @JoinColumn(unique = true)
    private Content content;

    @OneToOne(mappedBy = "invoice")
    @JsonIgnore
    private Entry entry;

    @ManyToMany(cascade = CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "invoice_product",
               joinColumns = @JoinColumn(name = "invoice_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"))
    private Set<Product> products = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("senders")
    private Company company;

    @ManyToOne
    @JsonIgnoreProperties("receivers")
    private Contractor contractor;

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

    public Invoice name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public Invoice number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public LocalDate getDocumentDate() {
        return documentDate;
    }

    public Invoice documentDate(LocalDate documentDate) {
        this.documentDate = documentDate;
        return this;
    }

    public void setDocumentDate(LocalDate documentDate) {
        this.documentDate = documentDate;
    }

    public String getSellPlace() {
        return sellPlace;
    }

    public Invoice sellPlace(String sellPlace) {
        this.sellPlace = sellPlace;
        return this;
    }

    public void setSellPlace(String sellPlace) {
        this.sellPlace = sellPlace;
    }

    public LocalDate getSellDate() {
        return sellDate;
    }

    public Invoice sellDate(LocalDate sellDate) {
        this.sellDate = sellDate;
        return this;
    }

    public void setSellDate(LocalDate sellDate) {
        this.sellDate = sellDate;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public Invoice bankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
        return this;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public Float getTotalNetto() {
        return totalNetto;
    }

    public Invoice totalNetto(Float totalNetto) {
        this.totalNetto = totalNetto;
        return this;
    }

    public void setTotalNetto(Float totalNetto) {
        this.totalNetto = totalNetto;
    }

    public Float getTotalVat() {
        return totalVat;
    }

    public Invoice totalVat(Float totalVat) {
        this.totalVat = totalVat;
        return this;
    }

    public void setTotalVat(Float totalVat) {
        this.totalVat = totalVat;
    }

    public Float getTotalBrutto() {
        return totalBrutto;
    }

    public Invoice totalBrutto(Float totalBrutto) {
        this.totalBrutto = totalBrutto;
        return this;
    }

    public void setTotalBrutto(Float totalBrutto) {
        this.totalBrutto = totalBrutto;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public Invoice paymentType(String paymentType) {
        this.paymentType = paymentType;
        return this;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public Invoice paymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
        return this;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public LocalDate getPaymentDueDate() {
        return paymentDueDate;
    }

    public Invoice paymentDueDate(LocalDate paymentDueDate) {
        this.paymentDueDate = paymentDueDate;
        return this;
    }

    public void setPaymentDueDate(LocalDate paymentDueDate) {
        this.paymentDueDate = paymentDueDate;
    }

    public String getNotes() {
        return notes;
    }

    public Invoice notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getSize() {
        return size;
    }

    public Invoice size(Long size) {
        this.size = size;
        return this;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getMimeType() {
        return mimeType;
    }

    public Invoice mimeType(String mimeType) {
        this.mimeType = mimeType;
        return this;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public Content getContent() {
        return content;
    }

    public Invoice content(Content content) {
        this.content = content;
        return this;
    }

    public void setContent(Content content) {
        this.content = content;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Invoice products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Invoice addProduct(Product product) {
        this.products.add(product);
        product.getInvoices().add(this);
        return this;
    }

    public Invoice removeProduct(Product product) {
        this.products.remove(product);
        product.getInvoices().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Company getCompany() {
        return company;
    }

    public Invoice company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Contractor getContractor() {
        return contractor;
    }

    public Invoice contractor(Contractor contractor) {
        this.contractor = contractor;
        return this;
    }

    public void setContractor(Contractor contractor) {
        this.contractor = contractor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Invoice)) {
            return false;
        }
        return id != null && id.equals(((Invoice) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Invoice{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", number=" + getNumber() +
            ", documentDate='" + getDocumentDate() + "'" +
            ", sellPlace='" + getSellPlace() + "'" +
            ", sellDate='" + getSellDate() + "'" +
            ", bankAccount='" + getBankAccount() + "'" +
            ", totalNetto=" + getTotalNetto() +
            ", totalVat=" + getTotalVat() +
            ", totalBrutto=" + getTotalBrutto() +
            ", paymentType='" + getPaymentType() + "'" +
            ", paymentDate='" + getPaymentDate() + "'" +
            ", paymentDueDate='" + getPaymentDueDate() + "'" +
            ", notes='" + getNotes() + "'" +
            ", size=" + getSize() +
            ", mimeType='" + getMimeType() + "'" +
            "}";
    }

    public Entry getEntry() {
        return entry;
    }

    public void setEntry(Entry entry) {
        this.entry = entry;
    }
}
