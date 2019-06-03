package pl.gpiwosz.accountancy.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Company.
 */
@Entity
@Table(name = "company")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Company implements Serializable {

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

    @Column(name = "surname")
    private String surname;

    @Column(name = "address")
    private String address;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "city")
    private String city;

    @Column(name = "n_ip")
    private String nIP;

    @Column(name = "phone")
    private Long phone;

    @Column(name = "form_of_taxation")
    private String formOfTaxation;

    @Column(name = "v_a_tpayer")
    private Boolean vATpayer;

    @Column(name = "z_u_seasy_start")
    private Boolean zUSeasyStart;

    @Column(name = "z_u_small")
    private Boolean zUSmall;

    @Column(name = "z_u_sdisease")
    private Boolean zUSdisease;

    @Column(name = "is_zu_spayer")
    private Boolean isZUSpayer;

    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnoreProperties("company")
    private Set<MonthSumUp> monthSumUps = new HashSet<>();

    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Invoice> senders = new HashSet<>();

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

    public Company companyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getShortName() {
        return shortName;
    }

    public Company shortName(String shortName) {
        this.shortName = shortName;
        return this;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getName() {
        return name;
    }

    public Company name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public Company surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getAddress() {
        return address;
    }

    public Company address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Company postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public Company city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getnIP() {
        return nIP;
    }

    public Company nIP(String nIP) {
        this.nIP = nIP;
        return this;
    }

    public void setnIP(String nIP) {
        this.nIP = nIP;
    }

    public Long getPhone() {
        return phone;
    }

    public Company phone(Long phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public String getFormOfTaxation() {
        return formOfTaxation;
    }

    public Company formOfTaxation(String formOfTaxation) {
        this.formOfTaxation = formOfTaxation;
        return this;
    }

    public void setFormOfTaxation(String formOfTaxation) {
        this.formOfTaxation = formOfTaxation;
    }

    public Boolean isvATpayer() {
        return vATpayer;
    }

    public Company vATpayer(Boolean vATpayer) {
        this.vATpayer = vATpayer;
        return this;
    }

    public void setvATpayer(Boolean vATpayer) {
        this.vATpayer = vATpayer;
    }

    public Boolean iszUSeasyStart() {
        return zUSeasyStart;
    }

    public Company zUSeasyStart(Boolean zUSeasyStart) {
        this.zUSeasyStart = zUSeasyStart;
        return this;
    }

    public void setzUSeasyStart(Boolean zUSeasyStart) {
        this.zUSeasyStart = zUSeasyStart;
    }

    public Boolean iszUSmall() {
        return zUSmall;
    }

    public Company zUSmall(Boolean zUSmall) {
        this.zUSmall = zUSmall;
        return this;
    }

    public void setzUSmall(Boolean zUSmall) {
        this.zUSmall = zUSmall;
    }

    public Boolean iszUSdisease() {
        return zUSdisease;
    }

    public Company zUSdisease(Boolean zUSdisease) {
        this.zUSdisease = zUSdisease;
        return this;
    }

    public void setzUSdisease(Boolean zUSdisease) {
        this.zUSdisease = zUSdisease;
    }

    public Boolean isIsZUSpayer() {
        return isZUSpayer;
    }

    public Company isZUSpayer(Boolean isZUSpayer) {
        this.isZUSpayer = isZUSpayer;
        return this;
    }

    public void setIsZUSpayer(Boolean isZUSpayer) {
        this.isZUSpayer = isZUSpayer;
    }

    public Set<MonthSumUp> getMonthSumUps() {
        return monthSumUps;
    }

    public Company monthSumUps(Set<MonthSumUp> monthSumUps) {
        this.monthSumUps = monthSumUps;
        return this;
    }

    public Company addMonthSumUp(MonthSumUp monthSumUp) {
        this.monthSumUps.add(monthSumUp);
        monthSumUp.setCompany(this);
        return this;
    }

    public Company removeMonthSumUp(MonthSumUp monthSumUp) {
        this.monthSumUps.remove(monthSumUp);
        monthSumUp.setCompany(null);
        return this;
    }

    public void setMonthSumUps(Set<MonthSumUp> monthSumUps) {
        this.monthSumUps = monthSumUps;
    }

    public Set<Invoice> getSenders() {
        return senders;
    }

    public Company senders(Set<Invoice> invoices) {
        this.senders = invoices;
        return this;
    }

    public Company addSender(Invoice invoice) {
        this.senders.add(invoice);
        invoice.setCompany(this);
        return this;
    }

    public Company removeSender(Invoice invoice) {
        this.senders.remove(invoice);
        invoice.setCompany(null);
        return this;
    }

    public void setSenders(Set<Invoice> invoices) {
        this.senders = invoices;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Company)) {
            return false;
        }
        return id != null && id.equals(((Company) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", companyName='" + getCompanyName() + "'" +
            ", shortName='" + getShortName() + "'" +
            ", name='" + getName() + "'" +
            ", surname='" + getSurname() + "'" +
            ", address='" + getAddress() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            ", nIP='" + getnIP() + "'" +
            ", phone=" + getPhone() +
            ", formOfTaxation='" + getFormOfTaxation() + "'" +
            ", vATpayer='" + isvATpayer() + "'" +
            ", zUSeasyStart='" + iszUSeasyStart() + "'" +
            ", zUSmall='" + iszUSmall() + "'" +
            ", zUSdisease='" + iszUSdisease() + "'" +
            ", isZUSpayer='" + isIsZUSpayer() + "'" +
            "}";
    }
}
