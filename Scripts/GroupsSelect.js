var GroupsSelect = Base.extend({
    constructor: function (groups) {
        this.__active = false;
        this.__groupsContainer = document.getElementById("Groups");
        this.__buttonGroups = document.getElementById("GroupsButton");
        this.groupsList = document.createElement("div");
        this.groupsList.classList.add("groupList");
        this.activeGroup = groups[0];
        this.__addGroups(groups);
    },
    clickGroups: function () {
        if (!this.__active)
            this.__open();
        else
            this.__close();
    },
    __addGroups: function (groups) {
        var ul = document.createElement("ul");
        this.groupsList.appendChild(ul);
        for (var i = 0; i < groups.length; i++) {
            var self = this;
            var li = document.createElement("li");
            li.innerHTML = groups[i];
            li.classList.add("styleLi");
            if (groups[i] === self.activeGroup) {
                li.classList.add("displayNone");
                this.activeGroup = li;
                document.getElementById("HeadingGroup").innerHTML = this.activeGroup.innerHTML;
            }
            li.addEventListener("click", function (sender) {
                self.__setActiveGroup(sender.currentTarget);
                self.activeGroup = sender.currentTarget;
                document.getElementById("HeadingGroup").innerHTML = self.activeGroup.innerHTML;
                EventHelpers.triggerEvent(self.groupsList, "groupChanged", { group: self.activeGroup });
            });
            ul.appendChild(li, ul.firstChild);
        }
    },
    __setActiveGroup: function (li) {
        this.activeGroup.classList.remove("displayNone");
        this.activeGroup.classList.add("displayListItem");
        this.activeGroup = li;
        if (li.classList.contains("displayListItem"))
            this.activeGroup.classList.remove("displayListItem");
        this.activeGroup.classList.add("displayNone");
    },
    __open: function () {
        this.__active = !this.__active;
        this.__buttonGroups.appendChild(this.groupsList);
        this.__groupsContainer.classList.remove("groupsListDisactive");
        this.__groupsContainer.classList.add("groupsListActive");
        this.groupsList.classList.remove("groupsListClose");
        this.groupsList.classList.add("groupsList");
        this.groupsList.firstChild.classList.remove("groupListUlClose");
        this.groupsList.firstChild.classList.add("groupListUl");
    },
    __close: function () {
        if (this.__active) {
            this.__active = !this.__active;
            this.__groupsContainer.classList.remove("groupsListActive");
            this.__groupsContainer.classList.add("groupsListDisactive");
            this.groupsList.classList.remove("groupsList");
            this.groupsList.classList.add("groupsListClose");
            this.groupsList.firstChild.classList.remove("groupListUl");
            this.groupsList.firstChild.classList.add("groupListUlClose");
            var self = this;
            setTimeout(function () { self.__buttonGroups.removeChild(self.__buttonGroups.childNodes[3]); }, 500);
        }
    }
});