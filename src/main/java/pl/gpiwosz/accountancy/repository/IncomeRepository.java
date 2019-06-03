package pl.gpiwosz.accountancy.repository;

import pl.gpiwosz.accountancy.domain.Income;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Income entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {
//    @EntityGraph(attributePaths = "invoice")
//    List<Income> findAll();
}
