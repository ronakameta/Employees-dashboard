import { createContext, useContext, useState } from "react";

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

const EmployeeContext = createContext();

function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  function handleAddNewEmp(newEmployee) {
    setEmployees((employees) => [...employees, newEmployee]);
  }

  function handleSelectEmployee(employee) {
    // employees.filter((employee) => employee.id === friend.id);
    setSelectedEmployee(employee);
  }

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        setEmployees,
        onAddNewEmp: handleAddNewEmp,
        selectedEmployee,
        setSelectedEmployee,
        onSelectEmployee: handleSelectEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

function useEmployees() {
  const context = useContext(EmployeeContext);

  return context;
}

export { EmployeeProvider, useEmployees };
