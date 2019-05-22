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
 * A Contractor.
 */
@Entity
@Table(name = "contractor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Contractor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "short_name")
    private String shortName;

    @Column(name = "name")
    private String name;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "city")
    private String city;

    @Column(name = "n_ip")
    private String nIP;

    @Column(name = "phone")
    private Long phone;

    @OneToMany(mappedBy = "contractor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Invoice> receivers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public Contractor companyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getShortName() {
        return shortName;
    }

    public Contractor shortName(String shortName) {
        this.shortName = shortName;
        return this;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getName() {
        return name;
    }

    public Contractor name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Contractor postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public Contractor city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getnIP() {
        return nIP;
    }

    public Contractor nIP(String nIP) {
        this.nIP = nIP;
        return this;
    }

    public void setnIP(String nIP) {
        this.nIP = nIP;
    }

    public Long getPhone() {
        return phone;
    }

    public Contractor phone(Long phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public Set<Invoice> getReceivers() {
        return receivers;
    }

    public Contractor receivers(Set<Invoice> invoices) {
        this.receivers = invoices;
        return this;
    }

    public Contractor addReceiver(Invoice invoice) {
        this.receivers.add(invoice);
        invoice.setContractor(this);
        return this;
    }

    public Contractor removeReceiver(Invoice invoice) {
        this.receivers.remove(invoice);
        invoice.setContractor(null);
        return this;
    }

    public void setReceivers(Set<Invoice> invoices) {
        this.receivers = invoices;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Contractor)) {
            return false;
        }
        return id != null && id.equals(((Contractor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Contractor{" +
            "id=" + getId() +
            ", companyName='" + getCompanyName() + "'" +
            ", shortName='" + getShortName() + "'" +
            ", name='" + getName() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            ", nIP='" + getnIP() + "'" +
            ", phone=" + getPhone() +
            "}";
    }
}
