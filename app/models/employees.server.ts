import { api } from "~/utils/api";

export async function getEmployees() {
  const res = await api.get(`/employee`);

  if (res.status !== 200) {
    throw new Error("Error while fetching employees");
  }

  const employeesData = res.data?.employees;
  return employeesData;
}

export async function createEmployee(employee) {
  const res = await api.post(`/employee`, employee);

  if (res.status !== 200) {
    throw new Error("Error while creating employee");
  }

  const employeeData = res.data;
  return employeeData;
}

export async function updateEmployee(employee) {
  const res = await api.patch(`/employee/${employee.id}`, employee);

  if (res.status !== 200) {
    throw new Error("Error while updating employee");
  }

  const employeeData = res.data;
  return employeeData;
}

export async function deleteEmployee(employeeId) {
  const res = await api.delete(`/employee/${employeeId}`);

  if (res.status !== 200) {
    throw new Error("Error while deleting employee");
  }

  const employeeData = res.data;
  return employeeData;
}
