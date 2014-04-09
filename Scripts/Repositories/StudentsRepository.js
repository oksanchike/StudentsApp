var StudentsRepository = Base.extend({
    constructor: function () {
        this.lastId = 5;
        this.students = TAFFY([
            { id: 1, gender: "M", surname: "Мостовой", name: "Вячеслав", patronymic: "Игоревич", dateOfBirth: "1992-10-07", dateOfReceipt: "2009-09-01", group: "МТ-202" },
            { id: 2, gender: "F", surname: "Запорожец", name: "Оксана", patronymic: "Викторовна", dateOfBirth: "1991-11-29", dateOfReceipt: "2009-09-01", group: "МТ-202" },
            { id: 3, gender: "F", surname: "Глухова", name: "Анастасия", patronymic: "Андреевна", dateOfBirth: "1992-01-03", dateOfReceipt: "2009-09-01", group: "МТ-202" },
            { id: 4, gender: "F", surname: "Хабибулина", name: "Татьяна", patronymic: "Васильевна", dateOfBirth: "1989-11-01", dateOfReceipt: "2009-09-01", group: "МТ-202" },
            { id: 5, gender: "М", surname: "Баранов", name: "Валентин", patronymic: "Владимирович", dateOfBirth: "1990-04-22", dateOfReceipt: "2009-09-01", group: "МТ-502" },
            { id: 6, gender: "M", surname: "Бондаренко", name: "Роман", patronymic: "Игоревич", dateOfBirth: "1992-10-07", dateOfReceipt: "2009-09-01", group: "МТ-502" },
            { id: 7, gender: "M", surname: "Брагин", name: "Владислав", patronymic: "Викторовна", dateOfBirth: "1991-11-29", dateOfReceipt: "2009-09-01", group: "МТ-502" },
            { id: 8, gender: "F", surname: "Лодочникова", name: "Алена", patronymic: "Александровна", dateOfBirth: "1992-01-03", dateOfReceipt: "2009-09-01", group: "МТ-502" },
            { id: 9, gender: "F", surname: "Наборщикова", name: "Елена", patronymic: "Васильевна", dateOfBirth: "1989-11-01", dateOfReceipt: "2009-09-01", group: "МТ-402" },
            { id: 10, gender: "М", surname: "Бухов", name: "Владимир", patronymic: "Александрович", dateOfBirth: "1990-04-22", dateOfReceipt: "2009-09-01", group: "МТ-502" },
            { id: 11, gender: "M", surname: "Веселков", name: "Александр", patronymic: "Игоревич", dateOfBirth: "1992-10-07", dateOfReceipt: "2009-09-01", group: "МТ-602" },
            { id: 12, gender: "F", surname: "Болотникова", name: "Марина", patronymic: "Сергеевна", dateOfBirth: "1991-11-29", dateOfReceipt: "2009-09-01", group: "МТ-202" },
            { id: 13, gender: "F", surname: "Казанцева", name: "Кристина", patronymic: "Андреевна", dateOfBirth: "1992-01-03", dateOfReceipt: "2009-09-01", group: "МТ-302" },
            { id: 14, gender: "F", surname: "Казанцева", name: "Татьяна", patronymic: "Андреевна", dateOfBirth: "1989-11-01", dateOfReceipt: "2009-09-01", group: "МТ-402" },
            { id: 15, gender: "М", surname: "Калачев", name: "Максим", patronymic: "Владимирович", dateOfBirth: "1990-04-22", dateOfReceipt: "2009-09-01", group: "МТ-502" },
            { id: 16, gender: "М", surname: "Пантелеев", name: "Георгий", patronymic: "Васельевич", dateOfBirth: "1992-10-07", dateOfReceipt: "2009-09-01", group: "МТ-102" },
            { id: 17, gender: "М", surname: "Ращектаев", name: "Юрий", patronymic: "Николаевич", dateOfBirth: "1991-11-29", dateOfReceipt: "2009-09-01", group: "МТ-202" },
            { id: 18, gender: "М", surname: "Сунагатов", name: "Эдуард", patronymic: "Петрович", dateOfBirth: "1992-01-03", dateOfReceipt: "2009-09-01", group: "МТ-502" },
            { id: 19, gender: "М", surname: "Столбов", name: "Николай", patronymic: "Ильич", dateOfBirth: "1989-11-01", dateOfReceipt: "2009-09-01", group: "МТ-402" },
            { id: 20, gender: "М", surname: "Макаренко", name: "Петр", patronymic: "Максимович", dateOfBirth: "1990-04-22", dateOfReceipt: "2009-09-01", group: "МТ-502" }
        ]);
    },
    save: function (student) {
        if (student.id !== null) {
            this.students({ id: student.id }).update(student);
        }
        else {
            student.id = this.lastId + 1;
            this.students.insert(student);
            this.lastId++;
        }
    },
    deleteStudent: function (student) {
        this.students({ id: student.id }).remove(student);
    },
    getGroups: function () {
        var groups = [];
        var students = this.students().get();
        for (var i = 0; i < students.length; i++) {
            var group = students[i].group;
            var found = false;
            for (var j = 0; j < groups.length; j++) {
                if (group == groups[j]) {
                    found = true;
                    break;
                }
            }
            if (!found)
                groups.push(group);
        }
        function sortFunction(a, b){
            if (a < b)
                return 1;
            if (a > b)
                return -1;
            return 0;
        }
        return groups.sort(sortFunction);
    },
    getById: function (id) {
        if (id !== null) {
            var student = this.students({ id: id }).first();
            if (student)
                return student;
            else
                return null;
        }
        else
            return null;
    },
    getAll: function () {
        return this.students().order("surname asec").get();
    },
    getByGroup: function (group) {
        return this.students({ group: group } ).order("surname asec").get();
    }
});