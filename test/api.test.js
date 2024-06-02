describe('handlePopUp', () => {
    beforeEach(() => {
        // Set up the DOM elements needed for the test
        document.body.innerHTML = '';
        handlePopUp();
    });

    afterEach(() => {
        // Clean up after each test
        document.body.innerHTML = '';
    });

    it('should display error message if terms and conditions are not accepted', () => {
        const popupBtn = document.querySelector('.popupBtn button');
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        
        // Trigger button click without accepting terms and conditions
        popupBtn.click();

        // Expect alert to be called with the error message
        expect(alertSpy).toHaveBeenCalledWith('Accept our condition!');
    });

    it('should display error message if invalid email is provided', () => {
        const popupBtn = document.querySelector('.popupBtn button');
        const workEmailInput = document.querySelector('#workEmail');
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Populate the form fields
        workEmailInput.value = 'invalid_email';

        // Trigger button click with invalid email
        popupBtn.click();

        // Expect alert to be called with the error message
        expect(alertSpy).toHaveBeenCalledWith('Enter valid email');
    });

    it('should send data and clear form fields on valid submission', async () => {
        const popupBtn = document.querySelector('.popupBtn button');
        const workEmailInput = document.querySelector('#workEmail');
        const firstNameInput = document.querySelector('#firstName');
        const lastNameInput = document.querySelector('#lastName');
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Populate the form fields
        workEmailInput.value = 'valid_email@example.com';
        firstNameInput.value = 'John';
        lastNameInput.value = 'Doe';

        // Mock fetch function to return a successful response
        jest.spyOn(window, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => ({ status: 'success' })
        });

        // Trigger button click with valid data
        await popupBtn.click();

        // Expect fetch to be called with the correct data
        expect(fetch).toHaveBeenCalledWith(expect.any(String), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:{
                workEmail: 'valid_email@example.com',
                firstName: 'John',
                lastName: 'Doe'
            }
        });

        // Expect form fields to be cleared
        expect(workEmailInput.value).toBe('');
        expect(firstNameInput.value).toBe('');
        expect(lastNameInput.value).toBe('');

        // Expect popup container to be removed from the DOM
        expect(document.querySelector('.container2')).toBeNull();
    });
});
