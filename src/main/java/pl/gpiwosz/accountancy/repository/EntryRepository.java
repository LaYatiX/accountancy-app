package pl.gpiwosz.accountancy.repository;

import pl.gpiwosz.accountancy.domain.Entry;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Entry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
    Optional<Entry> findByInvoiceId(Long id);
}
