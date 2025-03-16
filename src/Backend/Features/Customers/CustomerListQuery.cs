namespace Backend.Features.Customers;

//Query definition using MediatR. Takes an option parameter of type string "Searchtext" which will be used as filter in the query

public record GetCustomerListQuery(string ? SearchText) : IRequest<List<CustomerListQueryResponse>>;

// Query response. Includes both customer and category data.
public class CustomerListQueryResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Address { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Iban { get; set; } = "";
    public string CategoryCode { get; set; } = "";
    public string CategoryDescription { get; set; } = "";
}

