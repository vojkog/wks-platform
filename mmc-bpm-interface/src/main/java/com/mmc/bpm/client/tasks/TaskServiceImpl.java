package com.mmc.bpm.client.tasks;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.gson.JsonObject;
import com.mmc.bpm.engine.camunda.client.ProcessEngineClient;
import com.mmc.bpm.engine.model.spi.Task;

@Component
public class TaskServiceImpl implements TaskService {

	@Autowired
	private ProcessEngineClient processEngineClient;

	@Override
	public List<Task> find() {
		return Arrays.asList(processEngineClient.findTasks());
	}

	@Override
	public void claim(String taskId, String taskAssignee) {
		processEngineClient.claimTask(taskId, taskAssignee);

	}

	@Override
	public void unclaim(String taskId) {
		processEngineClient.unclaimTask(taskId);
	}

	@Override
	public void complete(String taskId, JsonObject variables) {
		processEngineClient.complete(taskId, variables);
	}

}
