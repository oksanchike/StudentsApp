var StudentsList = Base.extend({
    constructor: function (list) {
        this.list = list;
    },
    setActive: function (item) {
        if (this.active)
            this.active.classList.remove("studentsList-active");
        this.active = item;
        this.active.classList.add("studentsList-active");
        this.studentChanged = new CustomEvent("studentChanged", { detail: { id: this.getActiveId() } });
        this.list.dispatchEvent(this.studentChanged);
    },
    getActiveId: function () {
        var id = this.active.getAttribute("data-id");
        if (id !== null)
            id = parseInt(id);
        return id;
    },
    addStudent: function () {
        var li = document.createElement("li");
        var span = document.createElement("span");
        var spanLink = document.createElement("span");
        spanLink.innerHTML = "Новый студент";
        spanLink.classList.add("link");
        span.appendChild(spanLink);
        li.appendChild(span);
        var self = this;
        li.addEventListener("click", function (sender) {
            self.setActive(sender.currentTarget);
        });
        this.list.insertBefore(li, this.list.firstChild);
        this.setActive(li);
    },
    save: function (student) {
        this.active.setAttribute("data-id", student.id);
        this.active.firstChild.firstChild.innerHTML = student.surname + "&nbsp;" + student.name + "&nbsp;" + student.patronymic;
        this.__findPlaceForNew();
    },
    deleteStudent: function () {
        this.list.removeChild(this.active);
        this.setActive(this.list.firstChild);
    },
    deleteAllStudents: function () {
        var list = this.list;
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    },
    __findPlaceForNew: function () {
        var active = this.active;
        this.list.removeChild(active);
        var begin = 0;
        var end = this.list.childElementCount - 1;
        if (this.list.childElementCount == 0) {
            this.list.appendChild(active);
        }
        else if (active.firstChild.firstChild.innerHTML <= this.list.children[begin].firstChild.firstChild.innerHTML) {
            this.list.insertBefore(active, this.list.children[begin]);
        }
        else if (active.firstChild.firstChild.innerHTML >= this.list.children[end].firstChild.firstChild.innerHTML) {
            this.list.appendChild(active);
        }
        else {
            while (end - begin != 1) {
                var middle = Math.floor(end - (end - begin) / 2);
                if (this.list.children[middle].firstChild.firstChild.innerHTML > active.firstChild.firstChild.innerHTML) {
                    end = middle;
                }
                else if (this.list.children[middle].firstChild.firstChild.innerHTML < active.firstChild.firstChild.innerHTML) {
                    begin = middle;
                }
                else {
                    end = middle;
                    break;
                }
            }
            this.list.insertBefore(active, this.list.children[end]);
        }
    }
});