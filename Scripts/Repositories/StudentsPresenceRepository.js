var StudentsPresenceRepository = Base.extend({
    constructor: function () {
        this.studentsPresence = TAFFY([
            { id: 1, studentId: 1, subjectId: 1, totalAbsenseTime: 52, withValidReasonTime: 23, studying: true },
            { id: 2, studentId: 1, subjectId: 2, totalAbsenseTime: 6, withValidReasonTime: 6, studying: true },
            { id: 3, studentId: 1, subjectId: 3, totalAbsenseTime: 0, withValidReasonTime: 0, studying: true },
            { id: 4, studentId: 1, subjectId: 5, totalAbsenseTime: 2, withValidReasonTime: 0, studying: false }
        ]);
    },
    save: function () {

    },
    deleteStudentsPresence: function () {

    },
    getById: function (id) {

    },
    getAll: function () {
        return this.studentsPresence().get();
    }
});