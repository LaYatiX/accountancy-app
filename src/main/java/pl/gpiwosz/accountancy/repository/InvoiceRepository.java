package pl.gpiwosz.accountancy.repository;

import pl.gpiwosz.accountancy.domain.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Invoice entity.
 */
@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    @Query(value = "select distinct invoice from Invoice invoice left join fetch invoice.products",
        countQuery = "select count(distinct invoice) from Invoice invoice")
    Page<Invoice> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct invoice from Invoice invoice left join fetch invoice.products")
    List<Invoice> findAllWithEagerRelationships();

    @Query("select invoice from Invoice invoice left join fetch invoice.products where invoice.id =:id")
    Optional<Invoice> findOneWithEagerRelationships(@Param("id") Long id);

}
