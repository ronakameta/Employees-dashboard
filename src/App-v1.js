import { createContext, useContext, useEffect, useState } from "react";

let initialEmployees = [
  {
    name: "Ronak Ameta",
    age: "26",
    designation: "Software Associate",
    empID: "FUS-VA-1698",
    id: "111",
    image: `../public/profilepicture.webp`,
  },
  {
    name: "Jay Sharma",
    age: "23",
    designation: "Software Intern",
    empID: "FUS-VA-1556",
    id: "222",
    image: `male.jpg`,
  },
  {
    name: "Pankaj Sen",
    age: "28",
    designation: "Senior Associate",
    empID: "FUS-VA-1887",
    id: "333",
    // image: `https://i.pravatar.cc/150?=dfgdf`,
    image: `../public/profilepicture.webp`,
  },
  {
    name: "Suman Mehta",
    age: "21",
    designation: "Software Associate",
    empID: "FUS-VA-1995",
    id: "444",
    // image: `https://i.pravatar.cc/150?=d`,
    image: `../public/profilepicture.webp`,
  },
];

const EmpContext = createContext();

export default function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  function handleAddNewEmp(newEmployee) {
    setEmployees((employees) => [...employees, newEmployee]);
  }

  function handleSelectEmployee(employee) {
    // employees.filter((employee) => employee.id === friend.id);
    setSelectedEmployee(employee);
  }

  // console.log(employees);
  return (
    <EmpContext.Provider
      value={{
        employees,
        setEmployees,
        onAddNewEmp: handleAddNewEmp,
        selectedEmployee,
        setSelectedEmployee,
        onSelectEmployee: handleSelectEmployee,
      }}
    >
      <>
        <Header />
        <div className="container">
          <div className="sub-container">
            <NewEmployeeForm onAddNewEmp={handleAddNewEmp} />
          </div>
          {selectedEmployee && <UpdateEmployeeForm />}
          <EmployeeList
            employees={employees}
            onSelectEmployee={handleSelectEmployee}
          />
        </div>
      </>
    </EmpContext.Provider>
  );
}

function Header() {
  const { employees, setEmployees } = useContext(EmpContext);

  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e) {
    setSearchValue(e.target.value);
    setEmployees((employees) =>
      employees.filter((employee) => employee.name.includes(searchValue))
    );
  }

  useEffect(
    function () {
      localStorage.setItem("employees", JSON.stringify(employees));
    },
    [employees]
  );

  return (
    <div className="header">
      <span>EMPLOYEES DASHBOARD</span>
      <input
        placeholder=" Search"
        value={searchValue}
        onChange={(e) => handleSearch(e)}
      ></input>
    </div>
  );
}

function NewEmployeeForm() {
  const { onAddNewEmp } = useContext(EmpContext);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [designation, setDesignation] = useState("");
  const [empID, SetEmpID] = useState("");

  // const image = "https://i.pravatar.cc/150";

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !age || !designation || !empID) return;
    const id = crypto.randomUUID();

    const newEmployee = {
      name,
      age,
      designation,
      empID,
      id,
      image: `../public/profilepicture.webp`,
    };
    onAddNewEmp(newEmployee);
    setAge("");
    setName("");
    setDesignation("");
    SetEmpID("");
    setAge(52);
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <Input value={name} onChange={setName} placeholder="Full Name"></Input>
        <Input value={age} onChange={setAge} placeholder="Age">
          Date of Birth
        </Input>
        <Input
          value={designation}
          onChange={setDesignation}
          placeholder="Designation"
        ></Input>
        <Input
          value={empID}
          onChange={SetEmpID}
          placeholder="Employee ID"
        ></Input>

        <button>Add New Employee</button>
      </form>
    </div>
  );
}

function Input({ children, value, onChange, placeholder }) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </div>
  );
}

function EmployeeList() {
  const { employees } = useContext(EmpContext);

  return (
    <div className="employeecard-container">
      {employees.map((employee) => (
        <EmployeeCard employee={employee} />
      ))}
    </div>
  );
}

function EmployeeCard({ employee }) {
  const { onSelectEmployee } = useContext(EmpContext);
  return (
    <div className="card">
      <div className="img-container">
        <img
          className="emp-img"
          src="profilepicture.webp"
          alt={employee.name}
        ></img>
      </div>
      <div className="details-container">
        <span>{employee.name}</span>
        <span>{employee.age}</span>
        <span>{employee.designation}</span>
        <span>{employee.empID}</span>
      </div>
      <button onClick={() => onSelectEmployee(employee)}>Update</button>
    </div>
  );
}

function UpdateEmployeeForm() {
  const { selectedEmployee, setSelectedEmployee, setEmployees } =
    useContext(EmpContext);

  const [updatedName, setUpdatedName] = useState(selectedEmployee.name);
  const [updatedAge, setUpdatedAge] = useState(selectedEmployee.age);
  const [updatedDesignation, setUpdatedDesignation] = useState(
    selectedEmployee.designation
  );
  const [updatedEmpID, setUpdatedEmpID] = useState(selectedEmployee.empID);

  function handleSubmitUpdate(e) {
    e.preventDefault();
    if (!updatedName || !updatedAge || !updatedDesignation || !updatedEmpID)
      return;
    setEmployees((employees) =>
      employees.map((employee) =>
        employee.id === selectedEmployee.id
          ? {
              ...employee,
              name: updatedName,
              age: updatedAge,
              designation: updatedDesignation,
              empID: updatedEmpID,
            }
          : employee
      )
    );
    setSelectedEmployee(null);
  }

  function handleDelete() {
    setEmployees((employees) =>
      employees.filter((employee) => employee.id !== selectedEmployee.id)
    );
    setSelectedEmployee(null);
  }

  return (
    <div className="modal">
      <div className="update-form-container">
        <form onSubmit={handleSubmitUpdate}>
          <input
            type="text"
            placeholder={selectedEmployee?.name}
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder={selectedEmployee?.age}
            value={updatedAge}
            onChange={(e) => setUpdatedAge(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder={selectedEmployee?.designation}
            value={updatedDesignation}
            onChange={(e) => setUpdatedDesignation(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder={selectedEmployee?.empID}
            value={updatedEmpID}
            onChange={(e) => setUpdatedEmpID(e.target.value)}
          ></input>
          <button>Update Employee</button>
        </form>
        <button onClick={handleDelete} className="btn-del">
          Delete
        </button>
      </div>
    </div>
  );
}
