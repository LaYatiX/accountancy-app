package pl.gpiwosz.accountancy.web.rest;

import pl.gpiwosz.accountancy.domain.MonthSumUp;
import pl.gpiwosz.accountancy.repository.MonthSumUpRepository;
import pl.gpiwosz.accountancy.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link pl.gpiwosz.accountancy.domain.MonthSumUp}.
 */
@RestController
@RequestMapping("/api")
public class MonthSumUpResource {

    private final Logger log = LoggerFactory.getLogger(MonthSumUpResource.class);

    private static final String ENTITY_NAME = "monthSumUp";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MonthSumUpRepository monthSumUpRepository;

    public MonthSumUpResource(MonthSumUpRepository monthSumUpRepository) {
        this.monthSumUpRepository = monthSumUpRepository;
    }

    /**
     * {@code POST  /month-sum-ups} : Create a new monthSumUp.
     *
     * @param monthSumUp the monthSumUp to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new monthSumUp, or with status {@code 400 (Bad Request)} if the monthSumUp has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/month-sum-ups")
    public ResponseEntity<MonthSumUp> createMonthSumUp(@RequestBody MonthSumUp monthSumUp) throws URISyntaxException {
        log.debug("REST request to save MonthSumUp : {}", monthSumUp);
        if (monthSumUp.getId() != null) {
            throw new BadRequestAlertException("A new monthSumUp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MonthSumUp result = monthSumUpRepository.save(monthSumUp);
        return ResponseEntity.created(new URI("/api/month-sum-ups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /month-sum-ups} : Updates an existing monthSumUp.
     *
     * @param monthSumUp the monthSumUp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated monthSumUp,
     * or with status {@code 400 (Bad Request)} if the monthSumUp is not valid,
     * or with status {@code 500 (Internal Server Error)} if the monthSumUp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/month-sum-ups")
    public ResponseEntity<MonthSumUp> updateMonthSumUp(@RequestBody MonthSumUp monthSumUp) throws URISyntaxException {
        log.debug("REST request to update MonthSumUp : {}", monthSumUp);
        if (monthSumUp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MonthSumUp result = monthSumUpRepository.save(monthSumUp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, monthSumUp.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /month-sum-ups} : get all the monthSumUps.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of monthSumUps in body.
     */
    @GetMapping("/month-sum-ups")
    public List<MonthSumUp> getAllMonthSumUps() {
        log.debug("REST request to get all MonthSumUps");
        return monthSumUpRepository.findAll();
    }

    /**
     * {@code GET  /month-sum-ups/:id} : get the "id" monthSumUp.
     *
     * @param id the id of the monthSumUp to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the monthSumUp, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/month-sum-ups/{id}")
    public ResponseEntity<MonthSumUp> getMonthSumUp(@PathVariable Long id) {
        log.debug("REST request to get MonthSumUp : {}", id);
        Optional<MonthSumUp> monthSumUp = monthSumUpRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(monthSumUp);
    }

    /**
     * {@code DELETE  /month-sum-ups/:id} : delete the "id" monthSumUp.
     *
     * @param id the id of the monthSumUp to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/month-sum-ups/{id}")
    public ResponseEntity<Void> deleteMonthSumUp(@PathVariable Long id) {
        log.debug("REST request to delete MonthSumUp : {}", id);
        monthSumUpRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
