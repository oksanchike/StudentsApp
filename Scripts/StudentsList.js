var StudentsList = Base.extend({
    constructor: function(list) {
        this.list = list;
    },
    setActive: function(item) {
        if (this.__active) {
            this.__active.classList.remove("studentsList-active");
            this.__active.classList.add("studentsList-disactive");
        }
        this.__active = item;
        this.__active.classList.remove("studentsList-disactive");
        this.__active.classList.add("studentsList-active");
        EventHelpers.triggerEvent(this.list, "studentChanged", { id: this.getActiveId() });
    },
    getActiveId: function() {
        var id = this.__active.getAttribute("data-id");
        if (id !== null)
            id = parseInt(id, 10);
        return id;
    },
    addNewStudent: function() {
        var li = document.createElement("li");
        var span = document.createElement("span");
        var spanLink = document.createElement("span");
        spanLink.innerHTML = "Новый студент";
        spanLink.classList.add("link");
        span.appendChild(spanLink);
        li.appendChild(span);
        var self = this;
        li.addEventListener("click", function() {
            self.setActive(this);
        });
        this.list.insertBefore(li, this.list.firstChild);
        this.setActive(li);
    },
    save: function(student) {
        this.__active.setAttribute("data-id", student.id);
        this.__active.firstChild.firstChild.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
        this.__findPlaceForNew();
    },
    deleteStudent: function() {
        this.list.removeChild(this.__active);
        this.setActive(this.list.firstChild);
    },
    deleteAllStudents: function() {
        var list = this.list;
        while (list.firstChild)
            list.removeChild(list.firstChild);
    },
    __findPlaceForNew: function() {
        var active = this.__active;
        this.list.removeChild(active);
        var begin = 0;
        var end = this.list.childElementCount - 1;
        if (this.list.childElementCount === 0)
            this.list.appendChild(active);
        else if (getText(active) <= getText(this.list.children[begin]))
            this.list.insertBefore(active, this.list.children[begin]);
        else if (getText(active) >= getText(this.list.children[end]))
            this.list.appendChild(active);
        else {
            while (end - begin !== 1) {
                var middle = Math.floor(end - (end - begin) / 2);
                if (getText(this.list.children[middle]) > getText(active))
                    end = middle;
                else if (getText(this.list.children[middle]) < getText(active))
                    begin = middle;
                else {
                    end = middle;
                    break;
                }
            }
            this.list.insertBefore(active, this.list.children[end]);
        }

        function getText(item) {
            return item.firstChild.firstChild.innerHTML;
        }
    }
});