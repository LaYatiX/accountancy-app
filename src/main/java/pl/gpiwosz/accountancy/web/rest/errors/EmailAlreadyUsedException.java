package pl.gpiwosz.accountancy.web.rest.errors;

public class EmailAlreadyUsedException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public EmailAlreadyUsedException() {
        super(ErrorConstants.EMAIL_ALREADY_USED_TYPE, "Taki email już istnieje w systemie!", "userManagement", "emailexists");
    }
}
