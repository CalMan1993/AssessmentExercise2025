namespace Backend.Features.Suppliers;

internal class SupplierListQueryHandler : IRequestHandler<SupplierListQuery, List<SupplierListQueryResponse>>
{
    private readonly BackendContext _context;

    public SupplierListQueryHandler(BackendContext context)
    {
        _context = context;
    }

    public async Task<List<SupplierListQueryResponse>> Handle(SupplierListQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Suppliers.AsQueryable();
        if (!string.IsNullOrEmpty(request.Name))
            query = query.Where(q => q.Name.ToLower().Contains(request.Name.ToLower()));

        query = query.OrderBy(q => q.Name);

        // Get query result
        return await query.Select( s => new SupplierListQueryResponse
        {
            Id = s.Id,
            Name = s.Name,
            Address = s.Address,
            Email = s.Email,
            Phone = s.Phone,

        }).ToListAsync(cancellationToken);
    }
}