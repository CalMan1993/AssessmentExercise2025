namespace Backend.Features.Customers;

//Handler which manage the "GetCustomerListQuery" and returns a List of "CustomerListQueryResponse"
public class GetCustomerListQueryHandler : IRequestHandler<GetCustomerListQuery, List<CustomerListQueryResponse>>
{
    private readonly BackendContext _context;

    public GetCustomerListQueryHandler(BackendContext context)
    {
        _context = context;
    }

    public async Task<List<CustomerListQueryResponse>> Handle(GetCustomerListQuery request, CancellationToken cancellationToken)
    {
        // Includes data of "CustomerCategory" table for each client
        var query = _context.Customers.Include(c => c.CustomerCategory).AsQueryable();

        // If "SearchText" filter not empty, use it as filter in the query
        if(!string.IsNullOrEmpty(request.SearchText))
        {
            query = query.Where( c => c.Name.Contains(request.SearchText) || c.Email.Contains(request.SearchText));
        }

        // Get query result
        return await query.Select( c => new CustomerListQueryResponse
        {
            Id = c.Id,
            Name = c.Name,
            Address = c.Address,
            Email = c.Email,
            Phone = c.Phone,
            Iban = c.Iban,

            CategoryCode = c.CustomerCategory != null ? c.CustomerCategory.Code : "Customer code not available",
            CategoryDescription = c.CustomerCategory != null ? c.CustomerCategory.Description : "Customer description not available",

        }).ToListAsync(cancellationToken);
    }
}