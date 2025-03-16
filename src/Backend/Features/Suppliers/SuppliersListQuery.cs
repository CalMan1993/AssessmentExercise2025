namespace Backend.Features.Suppliers;

public class SupplierListQuery : IRequest<List<SupplierListQueryResponse>>
{
    public string? Name { get; set; }
}

public class SupplierListQueryResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Address { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
}

