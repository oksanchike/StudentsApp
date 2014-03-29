var StudentsPresenceRepository = Base.extend({
    constructor: function () {
        this.studentsPresence = TAFFY([
            { id: 1, studentId: 1, subjectId: 1, totalAbsenseTime: 3, withValidReasonTime: 2, studying: true },
            { id: 1, studentId: 1, subjectId: 2, totalAbsenseTime: 6, withValidReasonTime: 6, studying: true },
            { id: 1, studentId: 1, subjectId: 3, totalAbsenseTime: 0, withValidReasonTime: 0, studying: true },
            { id: 1, studentId: 1, subjectId: 5, totalAbsenseTime: 2, withValidReasonTime: 0, studying: false }
        ]);
    },
    save: function () {

    },
    deleteStudentsPresence: function () {

    },
    getById: function (id) {

    },
    getAll: function () {
        return this.studentsPresence();
    }
});