<table>
	<tr>
		<td style="border: 1px solid black; width: 200px;">AccountDeviceID</td>
		<td style="border: 1px solid black; width: 200px;">ResourceName</td>
		<td style="border: 1px solid black; width: 200px;">ResourceFile</td>
	</tr>
	{{#Return.Results.Devices}}
		<tr>
			<td style="border: 1px solid black; width: 200px;">{{AccountDeviceID}}</td>
			<td style="border: 1px solid black; width: 200px;">{{ResourceName}}</td>
			<td style="border: 1px solid black; width: 200px;">{{ResourceFile}}</td>
		</tr>
	{{/Return.Results.Devices}}
</table>
