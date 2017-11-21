package com.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpGetPost {

	/**
	 * get请求
	 * @param urlAll:请求接口
	 * @param charset:字符编码
	 * @return 返回json结果
	 */
	public static String get(String urlAll, String charset) {
		BufferedReader reader = null;
		String result = null;
		HttpURLConnection connection = null;
		StringBuffer sbf = new StringBuffer();
		String userAgent = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36";// 模拟浏览器
		try {
			URL url = new URL(urlAll);
			connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("GET");
			connection.setReadTimeout(30000);
			connection.setConnectTimeout(30000);
			connection.setRequestProperty("User-agent", userAgent);
			connection.connect();
			InputStream is = connection.getInputStream();
			reader = new BufferedReader(new InputStreamReader(is, charset));
			String strRead = null;
			while ((strRead = reader.readLine()) != null) {
				sbf.append(strRead);
				sbf.append("\r\n");
			}
			reader.close();
			result = sbf.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	/**
	 * post请求
	 * @param urlAll:请求接口
	 * @param charset:字符编码
	 * @return 返回json结果
	 */
	public static String post(String urlAll, String charset) throws Exception {
		BufferedReader in = null;
		PrintWriter out = null;
		HttpURLConnection httpConn = null;
		try {
			URL url = new URL(urlAll);
			httpConn = (HttpURLConnection) url.openConnection();
			httpConn.setRequestMethod("POST");
			httpConn.setDoInput(true);
			httpConn.setDoOutput(true);

			out = new PrintWriter(httpConn.getOutputStream());
			out.println(out);
			out.flush();

			if (httpConn.getResponseCode() == HttpURLConnection.HTTP_OK) {
				StringBuffer content = new StringBuffer();
				String tempStr = "";
				in = new BufferedReader(new InputStreamReader(httpConn.getInputStream(), charset));
				while ((tempStr = in.readLine()) != null) {
					content.append(tempStr);
					content.append("\r\n");
				}
				return content.toString();

			} else {
				throw new Exception("请求出现了问题!");
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				in.close();
				out.close();
				httpConn.disconnect();
			}
		}
		return null;
	} 
}
