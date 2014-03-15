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
        if (student.gender == 'F')
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
    },
    resetStudent: function () {
        this.title = document.getElementById('Title-student');
        this.title.innerHTML = "";
        this.surname = document.getElementById('SurnameStudent');
        this.surname.value = "";
        this.name = document.getElementById('NameStudent');
        this.name.value = "";
        this.patronymic = document.getElementById('PatronymicStudent');
        this.patronymic.value = "";
        this.gender = document.getElementById('Female');
            this.gender.checked = true;
        this.dateOfBirth = document.getElementById('DateOfBirth');
        this.dateOfBirth.value = "";
        this.dateOfReceipt = document.getElementById('DateOfReceipt');
        this.dateOfReceipt.value = "";
    }
});