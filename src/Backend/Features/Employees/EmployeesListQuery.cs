namespace Backend.Features.Employees;

public class EmployeesListQuery : IRequest<List<EmployeesListQueryResponse>>
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}

public class EmployeesListQueryResponse
{
    public int Id { get; set; }
    public string Code { get; internal set; } = "";
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Address { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public EmployeesListQueryResponseDepartment? Department { get; set; }
}

public class EmployeesListQueryResponseDepartment
{
    public string Code { get; set; } = "";
    public string Description { get; set; } = "";
}