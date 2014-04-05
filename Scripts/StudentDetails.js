var StudentDetails = Base.extend({
    constructor: function () {
        this.title = document.getElementById('Title-student');
        this.surname = document.getElementById('SurnameStudent');
        this.name = document.getElementById('NameStudent');
        this.patronymic = document.getElementById('PatronymicStudent');
        this.currentGender = document.getElementById('Female');
        this.male = document.getElementById('Male');
        this.dateOfBirth = document.getElementById('DateOfBirth');
        this.dateOfReceipt = document.getElementById('DateOfReceipt');
        this.validationMessagePatronymic = document.getElementById('validationMessagePatronymic');
        this.validationMessageName = document.getElementById('validationMessageName');
        this.validationMessageSurname = document.getElementById('validationMessageSurname');
    },
    setStudent: function (student) {    
        this.title.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
        this.surname.value = student.surname;
        this.name.value = student.name;
        this.patronymic.value = student.patronymic;
        if (student.gender === 'F')
            this.currentGender.checked = true;
        else {
            this.currentGender.checked = false;
            this.currentGender = this.male;
            this.currentGender.checked = true;
        }
        this.dateOfBirth.value = student.dateOfBirth;
        this.dateOfReceipt.value = student.dateOfReceipt;
        this.title.setAttribute("data-id", student.id);
        this.__initEventHandlers();
    },
    resetStudent: function () {
        this.title.innerHTML = "Новый студент";
        this.title.removeAttribute("data-id");
        this.surname.value = "";
        this.name.value = "";
        this.patronymic.value = "";
        this.currentGender.checked = true;
        this.dateOfBirth.value = "";
        this.dateOfReceipt.value = "2009-09-01";
    },
    serialize: function () {
        var gender;
        var id = this.title.getAttribute("data-id");
        if (id !== null)
            id = parseInt(id, 10);
        if (this.currentGender.checked)
            gender = "F";
        else
            gender = "M";
        var student = {
            id: id,
            gender: gender,
            surname: this.surname.value,
            name: this.name.value,
            patronymic: this.patronymic.value,
            dateOfBirth: this.dateOfBirth.value,
            dateOfReceipt: this.dateOfReceipt.value,
            group: "МТ-202"
        };
        return student;
    },
    save: function (student) {
        if (student.surname !== "" && student.name !== "" && student.patronymic !== "") {
            this.title.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
            return true;
        }
        else {
            this.showValidation(student);
            return false;
        }
    },
    showValidation: function (student) {
        if (student.patronymic === "") {
            this.validationMessagePatronymic.setAttribute("style", "visibility: visible");
            this.patronymic.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.patronymic.classList.add('validationFocus');
            this.patronymic.focus();
        }
        if (student.name === "") {
            this.validationMessageName.setAttribute("style", "visibility: visible");
            this.name.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.name.classList.add('validationFocus');
            this.name.focus();
        }
        if (student.surname === "") {
            this.validationMessageSurname.setAttribute("style", "visibility: visible");
            this.surname.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.surname.classList.add('validationFocus');
            this.surname.focus();
        }
    },
    resetValidation: function () {
        this.hideValidation(this.validationMessagePatronymic, this.patronymic);
        this.hideValidation(this.validationMessageName, this.name);
        this.hideValidation(this.validationMessageSurname, this.surname);
    },
    hideValidation: function (message, field) {
        if (field.classList.contains('validationFocus')) {
            field.classList.remove('validationFocus');
            field.removeAttribute("style");
            message.setAttribute("style", "visibility: hidden");
        }
    },
    initalizeSubjects: function (students) {

    },
    __initEventHandlers: function () { // Как назвать?
        var studentDetails = this;
        this.patronymic.onkeypress = function (e) {
            studentDetails.hideValidation(studentDetails.validationMessagePatronymic, studentDetails.patronymic);
        };
        this.name.onkeypress = function (e) {
            studentDetails.hideValidation(studentDetails.validationMessageName, studentDetails.name);
        };
        this.surname.onkeypress = function (e) {
            studentDetails.hideValidation(studentDetails.validationMessageSurname, studentDetails.surname);
        };
    }
});