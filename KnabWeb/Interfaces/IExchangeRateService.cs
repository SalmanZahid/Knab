using System.Threading.Tasks;

namespace KnabWeb.Interfaces
{
	public interface IExchangeRateService
	{
		Task<dynamic> GetRates(string code, string[] currencies);		
	}
}
