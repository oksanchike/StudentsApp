var StudentDetails = Base.extend({
    constructor: function () {
        this.chart = new Chart("draw");
        this.title = document.getElementById("Title-student");
        this.surname = document.getElementById("SurnameStudent");
        this.name = document.getElementById("NameStudent");
        this.patronymic = document.getElementById("PatronymicStudent");
        this.femail = document.getElementById("Female");
        this.male = document.getElementById("Male");
        this.dateOfBirth = document.getElementById("DateOfBirth");
        this.dateOfReceipt = document.getElementById("DateOfReceipt");
        this.validationMessagePatronymic = document.getElementById("validationMessagePatronymic");
        this.validationMessageName = document.getElementById("validationMessageName");
        this.validationMessageSurname = document.getElementById("validationMessageSurname");
        this.validationMessageDateOfBirth = document.getElementById("validationMessageDateOfBirth");
        this.validationMessageDateOfReceipt = document.getElementById("validationMessageDateOfReceipt");
        this.gender = document.getElementById("Gender");
        this.group = document.getElementById("HeadinGgroup");
    },
    setStudent: function (student, studentPresences, subjects) {
        this.title.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
        this.surname.value = student.surname;
        this.name.value = student.name;
        this.patronymic.value = student.patronymic;
        if (student.gender === "F") {
            this.gender.innerHTML = "Женский"
            this.femail.checked = true;
        }
        else {
            this.gender.innerHTML = "Мужской"
            this.femail.checked = false;
            this.male.checked = true;
        }
        this.dateOfBirth.value = student.dateOfBirth;
        this.dateOfReceipt.value = student.dateOfReceipt;
        this.title.setAttribute("data-id", student.id);
        this.__initEventHandlers();
        this.setSubjects(studentPresences);
        this.drawChartForStudent(studentPresences, subjects);
    },
    setSubjects: function (studentPresences) {
        var checkboxes = document.getElementById("subjectsPanel").getElementsByTagName("input");
        for (var i = 0; i < checkboxes.length; i++)
            checkboxes[i].checked = false;
        for (var i = 0; i < studentPresences.length; i++) {
            var checkbox = document.getElementById("subject" + studentPresences[i].subjectId);
            checkbox.checked = studentPresences[i].studying;
        }
    },
    drawChartForStudent: function (studentPresences, subjects) {
        this.chart.drawForStudent(studentPresences, subjects);
    },
    resetStudent: function () {
        this.title.innerHTML = "Новый студент";
        this.title.removeAttribute("data-id");
        this.surname.value = "";
        this.name.value = "";
        this.gender.innerHTML = "Женский"
        this.patronymic.value = "";
        this.femail.checked = true;
        this.dateOfBirth.value = "";
        this.dateOfReceipt.value = "01.09.2009";
    },
    serialize: function () {
        return { student: this.serializeStudent(), presences: this.serializePresences() };
    },
    serializeStudent: function () {
        var gender;
        var id = this.title.getAttribute("data-id");
        if (id !== null)
            id = parseInt(id, 10);
        if (this.femail.checked)
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
            group: this.group.innerHTML
        };
        return student;
    },
    serializePresences: function () {
        var presences = [];
        var checkboxes = document.getElementById("subjectsPanel").getElementsByTagName("input");
        for (var i = 0; i < checkboxes.length; i++) {
            presences.push({ id: parseInt(checkboxes[i].getAttribute("data-id"), 10), studying: checkboxes[i].checked });
        }
        return presences;
    },
    save: function (student) {
        var regexpName = /^[а-яА-ЯёЁ][а-яА-ЯёЁ_\.]{1,20}$/;
        var regexpDate = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
        if (regexpName.test(student.surname) && regexpName.test(student.name) && regexpName.test(student.patronymic) && regexpDate.test(student.dateOfBirth) && regexpDate.test(student.dateOfReceipt)) {
            this.title.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
            this.resetValidation();
            return true;
        }
        else {
            this.resetValidation();
            this.showValidation(student, regexpName, regexpDate);
            return false;
        }
    },
    showValidation: function (student, regexpName, regexpDate) {
        if (regexpDate.test(student.dateOfReceipt) != true) {
            if (student.dateOfReceipt === "") {
                this.validationMessageDateOfReceipt.innerHTML = "Поле обязательно к заполнению";
            }
            else {
                this.validationMessageDateOfReceipt.innerHTML = "Введены недопустимые символы";
            }
            this.validationMessageDateOfReceipt.setAttribute("style", "visibility: visible");
            this.dateOfReceipt.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.dateOfReceipt.classList.add("validationFocus");
            this.dateOfReceipt.focus();
        }
        if (regexpDate.test(student.dateOfBirth) != true) {
            if (student.dateOfBirth === "") {
                this.validationMessageDateOfBirth.innerHTML = "Поле обязательно к заполнению";
            }
            else {
                this.validationMessageDateOfBirth.innerHTML = "Введены недопустимые символы";
            }
            this.validationMessageDateOfBirth.setAttribute("style", "visibility: visible");
            this.dateOfBirth.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.dateOfBirth.classList.add("validationFocus");
            this.dateOfBirth.focus();
        }
        if (regexpName.test(student.patronymic) != true) {
            if (student.patronymic === "") {
                this.validationMessagePatronymic.innerHTML = "Поле обязательно к заполнению";
            }
            else {
                this.validationMessagePatronymic.innerHTML = "Введены недопустимые символы";
            }
            this.validationMessagePatronymic.setAttribute("style", "visibility: visible");
            this.patronymic.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.patronymic.classList.add("validationFocus");
            this.patronymic.focus();
        }
        if (regexpName.test(student.name) != true) {
            if (student.name === "") {
                this.validationMessageName.innerHTML = "Поле обязательно к заполнению";
            }
            else {
                this.validationMessageName.innerHTML = "Введены недопустимые символы";
            }
            this.validationMessageName.setAttribute("style", "visibility: visible");
            this.name.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.name.classList.add("validationFocus");
            this.name.focus();
        }
        if (regexpName.test(student.surname) != true) {
            if (student.surname === "") {
                this.validationMessageSurname.innerHTML = "Поле обязательно к заполнению";
            }
            else {
                this.validationMessageSurname.innerHTML = "Введены недопустимые символы";
            }
            this.validationMessageSurname.setAttribute("style", "visibility: visible");
            this.surname.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
            this.surname.classList.add("validationFocus");
            this.surname.focus();
        }
    },
    resetValidation: function () {
        this.hideValidation(this.validationMessagePatronymic, this.patronymic);
        this.hideValidation(this.validationMessageName, this.name);
        this.hideValidation(this.validationMessageSurname, this.surname);
        this.hideValidation(this.validationMessageDateOfBirth, this.dateOfBirth);
        this.hideValidation(this.validationMessageDateOfReceipt, this.dateOfReceipt);
    },
    hideValidation: function (message, field) {
        if (field.classList.contains("validationFocus")) {
            field.classList.remove("validationFocus");
            field.removeAttribute("style");
            message.setAttribute("style", "visibility: hidden");
        }
    },
    initalizeSubjects: function (subjects) {
        var columns = document.getElementsByClassName("subjectsColumn");
        var j = 0;
        for (var i = 0; i < subjects.length; i++) {
            var span = document.createElement("span");
            var input = document.createElement("input");
            var label = document.createElement("label");
            label.innerHTML = subjects[i].title;
            label.setAttribute("for", "subject" + (i + 1));
            input.type = "checkbox";
            input.setAttribute("id", "subject" + subjects[i].id);
            input.setAttribute("data-id", subjects[i].id);
            span.appendChild(input);
            span.appendChild(label);
            columns[j].appendChild(span);
            j = j < 2 ? j + 1 : 0;
        }
    },
    __initEventHandlers: function () {
        var studentDetails = this;
        this.patronymic.oninput = function () {
            studentDetails.hideValidation(studentDetails.validationMessagePatronymic, studentDetails.patronymic);
        };
        this.name.oninput = function () {
            studentDetails.hideValidation(studentDetails.validationMessageName, studentDetails.name);
        };
        this.surname.oninput = function () {
            studentDetails.hideValidation(studentDetails.validationMessageSurname, studentDetails.surname);
        };
        this.dateOfBirth.oninput = function () {
            studentDetails.hideValidation(studentDetails.validationMessageDateOfBirth, studentDetails.dateOfBirth);
        };
        this.dateOfReceipt.oninput = function () {
            studentDetails.hideValidation(studentDetails.validationMessageDateOfReceipt, studentDetails.dateOfReceipt);
        };
    }
});