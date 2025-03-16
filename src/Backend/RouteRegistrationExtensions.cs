using Backend.Features.Customers;
using Backend.Features.Employees;
using Backend.Features.Suppliers;

namespace Backend;

static class RouteRegistrationExtensions
{
    public static void UseApiRoutes(this WebApplication app)
    {
        var apiGroup = app.MapGroup("api");

        apiGroup.MapGet("suppliers/list", async ([AsParameters] SupplierListQuery query, IMediator mediator) =>
        {
            var result = await mediator.Send(query);
            return Results.Ok(result);
        })
        .WithName("GetSuppliersList")
        .WithOpenApi();

        apiGroup.MapGet("employees/list", async ([AsParameters] EmployeesListQuery query, IMediator mediator) =>
        {
            var result = await mediator.Send(query);
            return Results.Ok(result);
        })
        .WithName("GetEmployeesList")
        .WithOpenApi();

        // "Get" endpoint on /api/cusomters/list
        apiGroup.MapGet("customers/list", async ([AsParameters] GetCustomerListQuery query, IMediator mediator) => 
        {
            var result = await mediator.Send(query);
            return Results.Ok(result);
        })
        .WithName("GetCustomersName")
        .WithOpenApi();    

    }
}
