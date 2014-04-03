var StudentDetails = Base.extend({
    setStudent: function (student) {
        this.title = document.getElementById('Title-student');
        this.title.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
        this.surname = document.getElementById('SurnameStudent');
        this.surname.value = student.surname;
        this.name = document.getElementById('NameStudent');
        this.name.value = student.name;
        this.patronymic = document.getElementById('PatronymicStudent');
        this.patronymic.value = student.patronymic;
        this.gender = document.getElementById('Female');
        if (student.gender === 'F')
            this.gender.checked = true;
        else {
            this.gender.checked = false;
            this.gender = document.getElementById('Male');
            this.gender.checked = true;
        }
        this.dateOfBirth = document.getElementById('DateOfBirth');
        this.dateOfBirth.value = student.dateOfBirth;
        this.dateOfReceipt = document.getElementById('DateOfReceipt');
        this.dateOfReceipt.value = student.dateOfReceipt;
        this.title.setAttribute("data-id", student.id);
        this.validationMessagePatronymic = document.getElementById('validationMessagePatronymic');
        this.validationMessageName = document.getElementById('validationMessageName');
        this.validationMessageSurname = document.getElementById('validationMessageSurname');
        this.__initEventHandlers();
    },
    resetStudent: function () {
        this.title.innerHTML = "Новый студент";
        this.title.removeAttribute("data-id");
        this.surname.value = "";
        this.name.value = "";
        this.patronymic.value = "";
        this.gender.checked = true;
        this.dateOfBirth.value = "";
        this.dateOfReceipt.value = "2009-09-01";
    },
    serialize: function () {
        this.gender = document.getElementById('Female');
        var gender;
        var id = this.title.getAttribute("data-id");
        if (id !== null)
            id = parseInt(id, 10);
        if (this.gender.checked)
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
        document.getElementById('PatronymicStudent').onkeypress = function (e) {
            studentDetails.hideValidation(studentDetails.validationMessagePatronymic, studentDetails.patronymic);
        };
        document.getElementById('NameStudent').onkeypress = function (e) {
            studentDetails.hideValidation(studentDetails.validationMessageName, studentDetails.name);
        };
        document.getElementById('SurnameStudent').onkeypress = function (e) {
            studentDetails.hideValidation(studentDetails.validationMessageSurname, studentDetails.surname);
        };
    }
});