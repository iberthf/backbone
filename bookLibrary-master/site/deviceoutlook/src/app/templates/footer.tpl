<div class='footer'>
	<div class='l'>
		<ul class='footer_links'>
			{{#options}}
				<li><a class='{{class}}' href='{{href}}'>{{name}}</a>{{{separator}}}</li>
			{{/options}}
		</ul>
		<div class='l build_version'>
			<a>Build: {{build-date}} Version: {{version}}</a>
		</div>
	</div>
	<div class='r'>
		<a class='supp_link' href='{{support.href}}'>{{support.name}}</a>
		<p class='acc_num_foot'></p>
	</div>
</div>