var GroupsSelect = Base.extend({
    constructor: function (groups) {
        this.active = false;
        this.div2 = document.getElementById("Groups");
        this.div = document.getElementById("ButtonGroups");
        this.div1 = document.createElement("div");
        this.div1.classList.add("groupList");
        this.activeGroup = groups[0];
        this.addGroups(groups);
    },
    addGroups: function (groups) {
        var ul = document.createElement("ul");
        this.div1.appendChild(ul);
        for (var i = 0; i < groups.length; i++) {
            var self = this;
            var li = document.createElement("li");
            li.innerHTML = groups[i];
            li.classList.add("styleLi");
            if (groups[i] === self.activeGroup) {
                li.classList.add("displayNone");
                this.activeGroup = li;
                document.getElementById("HeadinGgroup").innerHTML = this.activeGroup.innerHTML;
            }
            li.addEventListener("click", function (sender) {
                self.setActiveGroup(sender.currentTarget);
                self.activeGroup = sender.currentTarget;
                document.getElementById("HeadinGgroup").innerHTML = self.activeGroup.innerHTML;
                triggerEvent(self.div1, "groupChanged", { group: self.activeGroup });
            });
            ul.appendChild(li, ul.firstChild);
        }
    },
    setActiveGroup: function (li) {
        this.activeGroup.classList.remove("displayNone");
        this.activeGroup.classList.add("displayListItem");
        this.activeGroup = li;
        if (li.classList.contains("displayListItem"))
            this.activeGroup.classList.remove("displayListItem");
        this.activeGroup.classList.add("displayNone");
    },
    clickGroups: function () {
        if (!this.active)
            this.open();
        else
            this.close();
    },
    open: function () {
        this.active = !this.active;
        this.div.appendChild(this.div1);
        this.div2.classList.add("groupsList-active");
    },
    close: function () {
        if (this.active) {
            this.active = !this.active;
            this.div.removeChild(this.div.childNodes[3]);
            this.div2.classList.remove("groupsList-active");
        }
    }
});