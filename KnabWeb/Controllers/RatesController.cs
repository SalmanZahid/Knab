using KnabWeb.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KnabWeb.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class RatesController : ControllerBase
	{
		readonly string[] Currencies = new[]
		{
			"USD", "EUR", "BRL", "GBP", "AUD"
		};

		private readonly IExchangeRateService exchangeRateService;

		public RatesController(IExchangeRateService rateService) => exchangeRateService = rateService;		

		[HttpGet]
		public async Task<IActionResult> Get(string code)
		{
			if (string.IsNullOrEmpty(code))
			{
				return BadRequest("Please provide crypto currency code");
			}
			else if (code.Length > 10)
			{
				return BadRequest("Crypto currency code should be not greather than 10");
			}

			return Ok(await exchangeRateService.GetRates(code, Currencies));
		}
	}
}
