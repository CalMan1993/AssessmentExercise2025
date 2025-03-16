namespace Backend.Features.Employees;

internal class EmployeesListQueryHandler : IRequestHandler<EmployeesListQuery, List<EmployeesListQueryResponse>>
{
    private readonly BackendContext _context;

    public EmployeesListQueryHandler(BackendContext context)
    {
        _context = context;
    }

    public async Task<List<EmployeesListQueryResponse>> Handle(EmployeesListQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Employees.AsQueryable();
        if (!string.IsNullOrEmpty(request.FirstName))
            query = query.Where(q => q.FirstName.ToLower().Contains(request.FirstName.ToLower()));
        if (!string.IsNullOrEmpty(request.LastName))
            query = query.Where(q => q.LastName.ToLower().Contains(request.LastName.ToLower()));

        var data = await query.OrderBy(q => q.LastName).ThenBy(q => q.FirstName).ToListAsync(cancellationToken);
        var result = new List<EmployeesListQueryResponse>();

        foreach (var item in data)
        {
            var resultItem = new EmployeesListQueryResponse
            {
                Id = item.Id,
                Code = item.Code,
                FirstName = item.FirstName,
                LastName = item.LastName,
                Address = item.Address,
                Email = item.Email,
                Phone = item.Phone,
            };

            var department = await _context.Departments.SingleOrDefaultAsync(q => q.Id == item.DepartmentId, cancellationToken);
            if (department is not null)
                resultItem.Department = new EmployeesListQueryResponseDepartment
                {
                    Code = department.Code,
                    Description = department.Description
                };


            result.Add(resultItem);
        }

        return result;
    }
}