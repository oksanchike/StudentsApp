var StudentsPresenceRepository = Base.extend({
    constructor: function () {
        this.lastId = 9;
        this.studentsPresence = TAFFY([
            { id: 1, studentId: 1, subjectId: 1, totalAbsenseTime: 5, withValidReasonTime: 2, studying: true },
            { id: 2, studentId: 1, subjectId: 2, totalAbsenseTime: 6, withValidReasonTime: 6, studying: true },
            { id: 3, studentId: 1, subjectId: 3, totalAbsenseTime: 0, withValidReasonTime: 0, studying: true },
            { id: 4, studentId: 1, subjectId: 5, totalAbsenseTime: 8, withValidReasonTime: 7, studying: false },
            { id: 5, studentId: 2, subjectId: 1, totalAbsenseTime: 5, withValidReasonTime: 2, studying: true },
            { id: 6, studentId: 2, subjectId: 2, totalAbsenseTime: 8, withValidReasonTime: 5, studying: true },
            { id: 7, studentId: 2, subjectId: 7, totalAbsenseTime: 5, withValidReasonTime: 2, studying: true },
            { id: 8, studentId: 2, subjectId: 8, totalAbsenseTime: 7, withValidReasonTime: 3, studying: true },
            { id: 9, studentId: 2, subjectId: 4, totalAbsenseTime: 5, withValidReasonTime: 2, studying: true },
            { id: 10, studentId: 3, subjectId: 1, totalAbsenseTime: 5, withValidReasonTime: 2, studying: true },
            { id: 11, studentId: 4, subjectId: 2, totalAbsenseTime: 6, withValidReasonTime: 6, studying: true },
            { id: 12, studentId: 4, subjectId: 3, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 13, studentId: 5, subjectId: 2, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 14, studentId: 5, subjectId: 5, totalAbsenseTime: 2, withValidReasonTime: 0, studying: false },
            { id: 15, studentId: 5, subjectId: 7, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 16, studentId: 6, subjectId: 6, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 17, studentId: 6, subjectId: 8, totalAbsenseTime: 2, withValidReasonTime: 0, studying: true },
            { id: 18, studentId: 7, subjectId: 4, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 19, studentId: 8, subjectId: 1, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 20, studentId: 8, subjectId: 2, totalAbsenseTime: 2, withValidReasonTime: 0, studying: true },
            { id: 22, studentId: 8, subjectId: 3, totalAbsenseTime: 2, withValidReasonTime: 0, studying: true },
            { id: 23, studentId: 8, subjectId: 4, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 24, studentId: 9, subjectId: 1, totalAbsenseTime: 2, withValidReasonTime: 0, studying: true },
            { id: 25, studentId: 9, subjectId: 2, totalAbsenseTime: 2, withValidReasonTime: 0, studying: true },
            { id: 26, studentId: 10, subjectId: 1, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 27, studentId: 10, subjectId: 2, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 28, studentId: 11, subjectId: 1, totalAbsenseTime: 2, withValidReasonTime: 0, studying: true },
            { id: 29, studentId: 12, subjectId: 3, totalAbsenseTime: 2, withValidReasonTime: 0, studying: true },
            { id: 30, studentId: 13, subjectId: 3, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 31, studentId: 14, subjectId: 2, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 32, studentId: 15, subjectId: 5, totalAbsenseTime: 2, withValidReasonTime: 0, studying: true },
            { id: 33, studentId: 16, subjectId: 5, totalAbsenseTime: 2, withValidReasonTime: 0, studying: true },
            { id: 34, studentId: 17, subjectId: 3, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 35, studentId: 18, subjectId: 2, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 36, studentId: 19, subjectId: 5, totalAbsenseTime: 2, withValidReasonTime: 0, studying: true },
            { id: 37, studentId: 19, subjectId: 6, totalAbsenseTime: 2, withValidReasonTime: 0, studying: false },
            { id: 38, studentId: 20, subjectId: 3, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 39, studentId: 20, subjectId: 2, totalAbsenseTime: 6, withValidReasonTime: 2, studying: true },
            { id: 40, studentId: 20, subjectId: 5, totalAbsenseTime: 2, withValidReasonTime: 0, studying: false }
        ]);
    },
    save: function (subjectInfo, studentId) {
        var studentPresence = this.studentsPresence({ studentId: studentId }).get();
        for (var i = 0; i < subjectInfo.length; i++) {
            var found = false;
            for (var j = 0; j < studentPresence.length; j++) {
                if (studentPresence[j].subjectId == subjectInfo[i].id) {
                    found = true;
                    break;
                }
            }
            if (found)
                this.studentsPresence({ subjectId: subjectInfo[i].id, studentId: studentId }).update({ studying: subjectInfo[i].studying });
            else if (subjectInfo[i].studying) {
                this.studentsPresence.insert({
                    id: this.lastId + 1,
                    studentId: studentId,
                    subjectId: subjectInfo[i].id,
                    totalAbsenseTime: 0,
                    withValidReasonTime: 0,
                    studying: true
                });
                this.lastId++;
            }
        }
    },
    getByStudentId: function (id) {
        return this.studentsPresence({ studentId: id }).get();
    },
    getAll: function () {
        return this.studentsPresence().get();
    }
});