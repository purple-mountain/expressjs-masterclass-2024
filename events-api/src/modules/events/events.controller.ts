import {
  EventsSearchParamsDto,
  eventsSearchParamsDtoSchema,
} from "#/modules/events/dto/requests/events-search-params.dto";
import {
  type EventsCreateRequestBodyDto,
  eventsCreateRequestBodyDtoSchema,
} from "./dto/requests/events-create-request-body.dto";
import {
  type EventsUpdateRequestBodyDto,
  eventsUpdateRequestBodyDtoSchema,
} from "./dto/requests/events-update-request-body.dto";
import { EventsService } from "#/modules/events/events.service";
import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { validateSearchParams } from "#/shared/validators/search-params.validator";
import { Router } from "express";
import { validateIdRouteParameter } from "#/shared/validators/route-parameter.validator";
import "express-async-errors";

export const EventsController = Router();

EventsController.get(
  "/",
  validateSearchParams(eventsSearchParamsDtoSchema),
  async (req, res) => {
    const searchParams = req.query as unknown as EventsSearchParamsDto;

    const events = await EventsService.getEvents();

    return res.status(200).json({
      message: "Events retrieved successfully",
      data: events,
      searchParams,
    });
  },
);

EventsController.post(
  "/",
  validateRequestBody(eventsCreateRequestBodyDtoSchema),
  async (req, res) => {
    const newEvent = await EventsService.createEvent(
      req.body as unknown as EventsCreateRequestBodyDto,
    );

    return res.status(201).json({
      message: "Event created successfully",
      data: newEvent,
    });
  },
);

EventsController.get(
  "/:eventId",
  validateIdRouteParameter("eventId"),
  async (req, res) => {
    const event = await EventsService.getEvent(req.params["eventId"] as string);

    return res.status(200).json({
      message: "Event retrieved successfully",
      data: event,
    });
  },
);

EventsController.patch(
  "/:eventId",
  validateIdRouteParameter("eventId"),
  validateRequestBody(eventsUpdateRequestBodyDtoSchema),
  async (req, res) => {
    const updatedEvent = await EventsService.updateEvent(
      req.body as unknown as EventsUpdateRequestBodyDto,
      req.params["eventId"] as string,
    );

    return res.status(200).json({
      message: "Event updated successfully",
      data: updatedEvent,
    });
  },
);

EventsController.delete(
  "/:eventId",
  validateIdRouteParameter("eventId"),
  async (req, res) => {
    const deletedEvent = await EventsService.deleteEvent(
      req.params["eventId"] as string,
    );

    return res.status(200).json({
      message: "Event deleted successfully",
      data: deletedEvent,
    });
  },
);

EventsController.get(
  "/:eventId/tickets",
  validateIdRouteParameter("eventId"),
  async (req, res) => {
    const tickets = await EventsService.getTickets(
      req.params["eventId"] as string,
    );

    return res.status(200).json({
      message: "Tickets retrieved successfully",
      data: tickets,
    });
  },
);
