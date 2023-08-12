async function main() {
    await getActiveUser();
  
    renderNavBar(navBarElement);
  }
  
  main();


  function handleCreateManager(e) {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const idNumber = e.target.elements.idNumber.value;
    const phone = e.target.elements.phone.value;
    const salary = e.target.elements.salary.value;
    const birthday = e.target.elements.birthday.value;
    const role = e.target.elements.role.value;
    console.log(name, email, password, idNumber, phone, birthday, salary, role );
    if (!name) throw new Error("No name");
    if (!email) throw new Error("No email");
    if (!password) throw new Error("No password");
    if (!idNumber) throw new Error("No idNumber");
    if (!phone) throw new Error("No phone");
    if (!birthday) throw new Error("No birthday");
    if (!salary) throw new Error("No salary");
    if (!role) throw new Error("No role");
    const newManager: any = { name, email, password, idNumber, phone, birthday, salary,role }
    fetch("/api/add-manager", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newManager),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) =>{
            console.error(error);      
        });
};



function handleCreateEmployee(e) {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const idNumber = e.target.elements.idNumber.value;
    const phone = e.target.elements.phone.value;
    const birthday = e.target.elements.birthday.value;
    const salary = e.target.elements.salary.value;
    const role = e.target.elements.role.value;
    console.log(name, email, password, idNumber, phone, birthday, salary, role);
    if (!name) throw new Error("No name");
    if (!email) throw new Error("No email");
    if (!password) throw new Error("No password");
    if (!idNumber) throw new Error("No idNumber");
    if (!phone) throw new Error("No phone");
    if (!birthday) throw new Error("No birthday");
    if (!salary) throw new Error("No salary");
    if (!role) throw new Error("No role");
    const newEmployee: any = { name, email, password, idNumber, phone, birthday, salary, role }
    fetch("/api/add-employee", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) =>{
            console.error(error);      
        });
};
const create_Employee_tab = document.querySelector(".create_Employee_Role") as HTMLDivElement;
const create_Manager_tab= document.querySelector(".create_Manager_Role") as HTMLDivElement;

function getRole(){
    try {
        fetch("/api/get-roles")
        .then((res) => res.json())
        .then((data) =>{
            console.log(data);           
            if (!data) throw new Error("didn't get any data");
            const role = data.roles;
            const html: string = role.map((role) =>{
                return `<option> ${role.name}</option>`
            }).join(" ");
            console.log(create_Manager_tab);
            console.log(create_Employee_tab);
            create_Employee_tab.innerHTML = `<select class= "create_Employee_Role_Select" name="role">${html} </select><br><br>`;
            create_Manager_tab.innerHTML = `<select class= "create_Employee_Role_Select" name="role">${html} </select><br><br>`; 
        })
    } catch (error) {
        console.log(error);    
    }
}


const create_Employee_Manager = document.querySelector(".create_Employee_Manager") as HTMLElement;

function getManager(){
    fetch("/api/get-managers")
    .then((res) => res.json())
    .then((data) =>{
            console.log(data);  
            if (!data) throw new Error("didn't get any data");
            const manager = data.managers;
            const html: string = manager.map((manager) =>{
                return `<option>${manager.name}</option>`
            }).join(" ");
            create_Employee_Manager.innerHTML = `<select class= "create_Employee_Manager_Select" name="manager">${html} </select><br><br>`; 
    })
}

