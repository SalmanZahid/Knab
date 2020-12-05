using KnabWeb.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace KnabWeb.Services
{
	public class CoinMarketService : IExchangeRateService
	{
		public async Task<dynamic> GetRates(string code, string[] currencies)
		{
			List<Quote> quotes = new List<Quote>();

			try
			{
				using (var httpClient = new HttpClient())
				{
					string uri = $"https://web-api.coinmarketcap.com/v1/tools/price-conversion?symbol={code}&" +
						$"convert={string.Join(',', currencies)}&amount=1";

					HttpResponseMessage response = await httpClient.GetAsync(uri);
					response.EnsureSuccessStatusCode();

					var serializedResponse = JsonConvert.DeserializeObject<JObject>(await response.Content.ReadAsStringAsync());

					var quote = JObject.FromObject(serializedResponse["data"]["quote"]).ToObject<Dictionary<string, JObject>>();

					foreach (var item in quote)
					{
						quotes.Add(new Quote()
						{
							Symbol = item.Key,
							Price = Convert.ToDouble(item.Value["price"])
						});
					}

					return quotes;
				}
			}
			catch
			{
				return quotes;
			}
		}
	}
}
