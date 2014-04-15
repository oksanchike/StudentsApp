var StudentDetails = Base.extend({
    constructor: function() {
        this.__chart = new Chart(document.getElementById("Chart"));
        this.__title = document.getElementById("Title");
        this.__surnameInput = document.getElementById("SurnameStudent");
        this.__nameInput = document.getElementById("NameStudent");
        this.__patronymicInput = document.getElementById("PatronymicStudent");
        this.__femailRadioButton = document.getElementById("Female");
        this.__maleRadioButton = document.getElementById("Male");
        this.__dateOfBirthInput = document.getElementById("DateOfBirth");
        this.__dateOfReceiptInput = document.getElementById("DateOfReceipt");
        this.__validationMessagePatronymic = document.getElementById("ValidationMessagePatronymic");
        this.__validationMessageName = document.getElementById("ValidationMessageName");
        this.__validationMessageSurname = document.getElementById("ValidationMessageSurname");
        this.__validationMessageDateOfBirth = document.getElementById("ValidationMessageDateOfBirth");
        this.__validationMessageDateOfReceipt = document.getElementById("ValidationMessageDateOfReceipt");
        this.__genderForPrint = document.getElementById("GenderForPrint");
        this.__groupForPrint = document.getElementById("GroupForPrint");
        this.__groupPanel = document.getElementById("HeadingGroup");
        this.__createDatepickers();
        this.__initEventHandlers();
    },
    setStudent: function(student, studentPresences, subjects) {
        this.__studentPresences = studentPresences;
        this.__studentSubjects = subjects;
        this.__title.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
        this.__surnameInput.value = student.surname;
        this.__nameInput.value = student.name;
        this.__patronymicInput.value = student.patronymic;
        if (student.gender === "F") {
            this.__genderForPrint.innerHTML = "Женский";
            this.__femailRadioButton.checked = true;
        } else {
            this.__genderForPrint.innerHTML = "Мужской";
            this.__femailRadioButton.checked = false;
            this.__maleRadioButton.checked = true;
        }
        this.__groupForPrint.value = student.group;
        this.__dateOfBirthInput.value = student.dateOfBirth;
        this.__dateOfReceiptInput.value = student.dateOfReceipt;
        this.__title.setAttribute("data-id", student.id);
        this.__setSubjects(this.__studentPresences);
        this.__drawChartForStudent(this.__studentPresences, this.__studentSubjects);
    },
    validate: function() {
        var regexpName = /^[А-ЯЁ][а-яА-ЯёЁ_\.]{1,20}$/;
        var regexpDate = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
        this.resetValidation();
        var isValid = this.__validate(regexpDate, this.__dateOfReceiptInput, this.__validationMessageDateOfReceipt);
        isValid &= this.__validate(regexpDate, this.__dateOfBirthInput, this.__validationMessageDateOfBirth); 
        isValid &= this.__validate(regexpName, this.__patronymicInput, this.__validationMessagePatronymic);
        isValid &= this.__validate(regexpName, this.__nameInput, this.__validationMessageName);
        isValid &= this.__validate(regexpName, this.__surnameInput, this.__validationMessageSurname);
        if (isValid)
            this.__title.innerHTML = this.__surnameInput.value + "&nbsp;" + this.__nameInput.value + "&nbsp;" + this.__patronymicInput.value;
        return isValid;
    },
    changeData: function(subjectId, checked) {
        if (checked) {
            for (var i = 0; i < this.__subjects.length; i++)
                if (this.__subjects[i].id === subjectId) {
                    this.__studentSubjects.push(this.__subjects[i]);
                    break;
                }
        } else {
            for (var i = 0; i < this.__studentSubjects.length; i++)
                if (this.__studentSubjects[i].id === subjectId) {
                    this.__studentSubjects.splice(i, 1);
                    break;
                }
        }
        var found = false;
        for (var i = 0; i < this.__studentPresences.length; i++) {
            if (this.__studentPresences[i].subjectId === subjectId) {
                this.__studentPresences[i].studying = checked;
                found = true;
                break;
            }
        }
        if (!found) {
            var newStudentPresences = {
                studentId: this.__getCurrentStudentId(),
                subjectId: subjectId,
                totalAbsenseTime: 0,
                withValidReasonTime: 0,
                studying: true
            };
            this.__studentPresences.push(newStudentPresences);
        }
    },
    resetStudent: function() {
        this.__title.innerHTML = "Новый студент";
        this.__title.removeAttribute("data-id");
        this.__surnameInput.value = "";
        this.__nameInput.value = "";
        this.__genderForPrint.innerHTML = "Женский";
        this.__groupForPrint.value = this.__groupPanel.innerHTML;
        this.__patronymicInput.value = "";
        this.__femailRadioButton.checked = true;
        this.__dateOfBirthInput.value = "";
        this.__dateOfReceiptInput.value = "01.09.2009";
        this.__resetSudjects();
        this.__studentPresences = [];
        this.__studentSubjects = [];
        this.__drawChartForStudent(this.__studentPresences, this.__studentSubjects);
},
serialize: function() {
    return { student: this.__serializeStudent(), presences: this.__serializePresences() };
},
resetValidation: function() {
    this.__hideValidation(this.__validationMessagePatronymic, this.__patronymicInput);
    this.__hideValidation(this.__validationMessageName, this.__nameInput);
    this.__hideValidation(this.__validationMessageSurname, this.__surnameInput);
    this.__hideValidation(this.__validationMessageDateOfBirth, this.__dateOfBirthInput);
    this.__hideValidation(this.__validationMessageDateOfReceipt, this.__dateOfReceiptInput);
},
initalizeSubjects: function(subjects) {
    this.__subjects = subjects;
    var columns = document.getElementsByClassName("subjectsColumn");
    var j = 0;
    for (var i = 0; i < subjects.length; i++) {
        var id = subjects[i].id;
        var span = document.createElement("span");
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = subjects[i].title;
        label.setAttribute("for", "subject" + (i + 1));
        input.type = "checkbox";
        input.setAttribute("id", "subject" + id);
        input.setAttribute("data-id", id);
        span.appendChild(input);
        span.appendChild(label);
        columns[j].appendChild(span);
        input.onchange = function(subjectId, self) {
            return function() {
                self.changeData(subjectId, this.checked);
                self.__drawChartForStudent(self.__studentPresences, self.__studentSubjects);
            };
        }(id, this);
        j = j < 2 ? j + 1 : 0;
    }
},
__setSubjects: function(studentPresences) {
    var checkboxes = document.getElementById("SubjectsContainer").getElementsByTagName("input");
    for (var i = 0; i < checkboxes.length; i++)
        checkboxes[i].checked = false;
    for (var i = 0; i < studentPresences.length; i++) {
        var checkbox = document.getElementById("subject" + studentPresences[i].subjectId);
        checkbox.checked = studentPresences[i].studying;
    }
},
__resetSudjects: function(parameters) {
    var checkboxes = document.getElementById("SubjectsContainer").getElementsByTagName("input");
    for (var i = 0; i < checkboxes.length; i++)
        checkboxes[i].checked = false;
},
__drawChartForStudent: function(studentPresences, studentSubjects) {
    this.__chart.drawForStudent(studentPresences, studentSubjects);
},
__getCurrentStudentId: function() {
    var id = this.__title.getAttribute("data-id");
    if (id !== null)
        id = parseInt(id, 10);
    return id;
},
__serializeStudent: function() {
    var student = {
        id: this.__getCurrentStudentId(),
        gender: this.__femailRadioButton.checked ? "F" : "M",
        surname: this.__surnameInput.value,
        name: this.__nameInput.value,
        patronymic: this.__patronymicInput.value,
        dateOfBirth: this.__dateOfBirthInput.value,
        dateOfReceipt: this.__dateOfReceiptInput.value,
        group: this.__groupPanel.innerHTML
    };
    return student;
},
__serializePresences: function() {
    var presences = [];
    var checkboxes = document.getElementById("SubjectsContainer").getElementsByTagName("input");
    for (var i = 0; i < checkboxes.length; i++)
        presences.push({ id: parseInt(checkboxes[i].getAttribute("data-id"), 10), studying: checkboxes[i].checked });
    return presences;
},
__validate: function(regexp, input, message) {
    var isValid = regexp.test(input.value);
    if (!isValid) {
        if (input.value === "")
            message.innerHTML = "Поле обязательно к заполнению";
        else
            message.innerHTML = "Введено недопустимое значение";
        message.setAttribute("style", "visibility: visible");
        input.setAttribute("style", "background: rgba(255, 204, 204, 0.2)");
        input.classList.add("validationFocus");
        input.focus();
    }
    return isValid;
},
__hideValidation: function(message, fileId) {
    if (fileId.classList.contains("validationFocus")) {
        fileId.classList.remove("validationFocus");
        fileId.removeAttribute("style");
        message.setAttribute("style", "visibility: hidden");
    }
},
__createDatepickers: function() {
    var options = {
        changeMonth: true,
        changeYear: true,
        showOn: "button",
        dateFormat: "dd.mm.yy",
        yearRange: "1989:+0"
    };
    this.__createDatepicker("DateOfBirth", options);
    this.__createDatepicker("DateOfReceipt", options);
},
__createDatepicker: function(id, options) {
    $('#' + id).datepicker(options);
    var button = document.getElementById(id).parentNode.getElementsByClassName("ui-datepicker-trigger");
    button[0].innerHTML = "";
    var div = document.createElement("div");
    div.classList.add("icon");
    button[0].appendChild(div);
},
__initEventHandlers: function() {
    var self = this;
    this.__patronymicInput.oninput = function() {
        self.__hideValidation(self.__validationMessagePatronymic, self.__patronymicInput);
    };
    this.__nameInput.oninput = function() {
        self.__hideValidation(self.__validationMessageName, self.__nameInput);
    };
    this.__surnameInput.oninput = function() {
        self.__hideValidation(self.__validationMessageSurname, self.__surnameInput);
    };
    $(this.__dateOfBirthInput).change(function() {
        self.__hideValidation(self.__validationMessageDateOfBirth, self.__dateOfBirthInput);
    });
    this.__dateOfBirthInput.oninput = function() {
        self.__hideValidation(self.__validationMessageDateOfBirth, self.__dateOfBirthInput);
    };
    $(this.__dateOfReceiptInput).change(function() {
        self.__hideValidation(self.__validationMessageDateOfReceipt, self.__dateOfReceiptInput);
    });
    this.__dateOfReceiptInput.oninput = function() {
        self.__hideValidation(self.__validationMessageDateOfReceipt, self.__dateOfReceiptInput);
    };
}
});