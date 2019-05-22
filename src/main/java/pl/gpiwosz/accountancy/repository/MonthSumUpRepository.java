package pl.gpiwosz.accountancy.repository;

import pl.gpiwosz.accountancy.domain.MonthSumUp;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MonthSumUp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MonthSumUpRepository extends JpaRepository<MonthSumUp, Long> {

}
