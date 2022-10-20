package com.wks.bpm.engine.client;

import java.util.Optional;

import com.google.gson.JsonObject;
import com.wks.bpm.engine.BpmEngine;
import com.wks.bpm.engine.model.spi.ActivityInstance;
import com.wks.bpm.engine.model.spi.Deployment;
import com.wks.bpm.engine.model.spi.ProcessDefinition;
import com.wks.bpm.engine.model.spi.ProcessInstance;
import com.wks.bpm.engine.model.spi.ProcessMessage;
import com.wks.bpm.engine.model.spi.Task;
import com.wks.bpm.engine.model.spi.TaskForm;

/**
 * @author victor.franca
 *
 */
public interface BpmEngineClient {

	Deployment[] findDeployments(final BpmEngine bpmEngine);

	ProcessDefinition[] findProcessDefinitions(final BpmEngine bpmEngine);

	ProcessInstance[] findProcessInstances(final Optional<String> businessKey, final BpmEngine bpmEngine);

	String getProcessDefinitionXML(final String processDefinitionId, final BpmEngine bpmEngine);

	ProcessInstance startProcess(final String processDefinitionKey, final BpmEngine bpmEngine);

	ProcessInstance startProcess(final String processDefinitionKey, final String businessKey,
			final BpmEngine bpmEngine);

	void deleteProcessInstance(final String processInstanceId, final BpmEngine bpmEngine);

	ActivityInstance[] findActivityInstances(final String processInstanceId, final BpmEngine bpmEngine);

	Task[] findTasks(final String processInstanceBusinessKey, final BpmEngine bpmEngine);

	void claimTask(String taskId, String taskAssignee, final BpmEngine bpmEngine);

	void unclaimTask(String taskId, final BpmEngine bpmEngine);

	void complete(String taskId, JsonObject variables, final BpmEngine bpmEngine);

	TaskForm getTaskForm(final String taskId, final BpmEngine bpmEngine);

	String findVariables(final String processInstanceId, final BpmEngine bpmEngine);

	void sendMessage(final ProcessMessage processMesage, final BpmEngine bpmEngine);

}