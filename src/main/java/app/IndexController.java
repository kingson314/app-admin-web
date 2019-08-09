package app;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class IndexController {
	protected String basePath;
	protected HttpServletRequest request;
	protected HttpServletResponse response;
	protected HttpSession session;
	protected Map<String, Object> mapParams;// 非常规的其他参数

	@ModelAttribute
	protected void setReqAndRes(HttpServletRequest request, HttpServletResponse response) throws Exception {
		this.basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
				+ request.getContextPath() + "/";
		this.request = request;
		this.response = response;
		this.session = this.request.getSession();
		this.mapParams= new HashMap<String, Object>();
		for (Map.Entry<String, String[]> entry : request.getParameterMap().entrySet()) {
			String key = entry.getKey().trim();
			String[] value = entry.getValue();
			System.out.println(key + ":" + value[0]);
			if (value != null) {
				if (key.endsWith("[]")) {
					this.mapParams.put(key.replace("[]", ""), value);
				} else {
					this.mapParams.put(key, value[0]);
				}
			}
		}
	}

	@GetMapping("/")
	public String _index(ModelMap map) {
		map.addAttribute("basePath", this.basePath);
		map.addAttribute("token", "token");
		map.addAttribute("theme", "");
		map.addAttribute("sysUser", new SysUser());
		map.addAttribute("sysDepartment", new SysDepartment());
		return "index";
	}

	@GetMapping("/iframe")
	public String iframe(ModelMap map) throws Exception {

		map.addAttribute("basePath", this.basePath);
		map.addAttribute("token", "token");
		map.addAttribute("theme", "");
		map.addAttribute("sysUser", new SysUser());
		map.addAttribute("sysDepartment", new SysDepartment());
		map.addAllAttributes(this.mapParams);
		return "iframe";
	}

	class SysUser {
		private String id;
		private String name;

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}
	}

	class SysDepartment {
		private String id;
		private String name;

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

	}
}
