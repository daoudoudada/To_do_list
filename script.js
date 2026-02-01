        /**
         * =============================================
         * TASKFLOW - APLICACIÓN DE LISTA DE TAREAS
         * =============================================
         * 
         * Características:
         * - CRUD completo de tareas
         * - Persistencia con localStorage
         * - Filtros dinámicos
         * - Animaciones suaves
         * - Diseño responsive
         * 
         * @author Frontend Senior Developer
         * @version 1.0.0
         */

        // ==========================================
        // ESTADO DE LA APLICACIÓN
        // ==========================================
        
        class TaskManager {
            constructor() {
                // Inicializar estado
                this.tasks = this.loadTasks();
                this.currentFilter = 'all';
                
                // Cachear elementos del DOM
                this.cacheDOM();
                
                // Vincular eventos
                this.bindEvents();
                
                // Renderizar estado inicial
                this.render();
            }

            /**
             * Cachea referencias a elementos DOM para mejor rendimiento
             */
            cacheDOM() {
                this.taskInput = document.getElementById('taskInput');
                this.prioritySelect = document.getElementById('prioritySelect');
                this.timeInput = document.getElementById('timeInput');
                this.addBtn = document.getElementById('addBtn');
                this.tasksList = document.getElementById('tasksList');
                this.emptyState = document.getElementById('emptyState');
                this.filterBtns = document.querySelectorAll('.filter-btn');
                this.clearBtn = document.getElementById('clearBtn');
                this.pendingCount = document.getElementById('pendingCount');
            }

            /**
             * Vincula todos los event listeners
             */
            bindEvents() {
                // Añadir tarea al hacer click en el botón
                this.addBtn.addEventListener('click', () => this.addTask());
                
                // Añadir tarea con Enter
                this.taskInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.addTask();
                });

                // Filtros
                this.filterBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        this.setFilter(e.target.dataset.filter);
                    });
                });

                // Limpiar completadas
                this.clearBtn.addEventListener('click', () => this.clearCompleted());

                // Modal de edición
                document.getElementById('modalClose').addEventListener('click', () => this.closeEditModal());
                document.getElementById('cancelEdit').addEventListener('click', () => this.closeEditModal());
                document.getElementById('saveEdit').addEventListener('click', () => this.saveEditedTask());
                
                // Cerrar modal con ESC
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') this.closeEditModal();
                });

                // Cerrar modal al hacer clic fuera
                document.getElementById('editModal').addEventListener('click', (e) => {
                    if (e.target.id === 'editModal') this.closeEditModal();
                });
            }

            // ==========================================
            // CRUD OPERATIONS
            // ==========================================

            /**
             * Añade una nueva tarea
             */
            addTask() {
                const text = this.taskInput.value.trim();
                const scheduledTime = this.timeInput.value;
                const priority = this.prioritySelect.value;
                
                // Validación
                if (!text) {
                    this.taskInput.focus();
                    return;
                }

                // Crear nueva tarea
                const task = {
                    id: Date.now(), // ID único basado en timestamp
                    text: text,
                    completed: false,
                    priority: priority,
                    createdAt: new Date().toISOString(),
                    scheduledTime: scheduledTime || null
                };

                // Añadir al estado
                this.tasks.unshift(task); // unshift para añadir al inicio
                
                // Guardar en localStorage
                this.saveTasks();
                
                // Limpiar inputs
                this.taskInput.value = '';
                this.timeInput.value = '';
                this.prioritySelect.value = 'medium';
                this.taskInput.focus();
                
                // Re-renderizar
                this.render();
            }

            /**
             * Alterna el estado completado de una tarea
             * @param {number} id - ID de la tarea
             */
            toggleTask(id) {
                const task = this.tasks.find(t => t.id === id);
                if (task) {
                    task.completed = !task.completed;
                    this.saveTasks();
                    this.render();
                }
            }

            /**
             * Elimina una tarea con animación
             * @param {number} id - ID de la tarea
             */
            deleteTask(id) {
                // Encontrar el elemento en el DOM para animarlo
                const taskElement = document.querySelector(`[data-task-id="${id}"]`);
                
                if (taskElement) {
                    // Añadir clase de animación
                    taskElement.classList.add('removing');
                    
                    // Esperar a que termine la animación antes de eliminar
                    setTimeout(() => {
                        this.tasks = this.tasks.filter(t => t.id !== id);
                        this.saveTasks();
                        this.render();
                    }, 300); // Duración de la animación
                }
            }

            /**
             * Elimina todas las tareas completadas
             */
            clearCompleted() {
                this.tasks = this.tasks.filter(t => !t.completed);
                this.saveTasks();
                this.render();
            }

            /**
             * Abre el modal de edición
             * @param {number} id - ID de la tarea
             */
            openEditModal(id) {
                const task = this.tasks.find(t => t.id === id);
                if (!task) return;

                // Guardar ID de la tarea que se está editando
                this.editingTaskId = id;

                // Llenar el modal con los datos actuales
                document.getElementById('editTaskText').value = task.text;
                document.getElementById('editPriority').value = task.priority || 'medium';
                document.getElementById('editTime').value = task.scheduledTime || '';

                // Mostrar el modal
                document.getElementById('editModal').classList.add('active');
                document.getElementById('editTaskText').focus();
            }

            /**
             * Cierra el modal de edición
             */
            closeEditModal() {
                document.getElementById('editModal').classList.remove('active');
                this.editingTaskId = null;
            }

            /**
             * Guarda los cambios de la tarea editada
             */
            saveEditedTask() {
                if (!this.editingTaskId) return;

                const task = this.tasks.find(t => t.id === this.editingTaskId);
                if (!task) return;

                // Obtener nuevos valores
                const newText = document.getElementById('editTaskText').value.trim();
                const newPriority = document.getElementById('editPriority').value;
                const newTime = document.getElementById('editTime').value;

                // Validar que haya texto
                if (!newText) {
                    alert('¡La tarea no puede estar vacía!');
                    return;
                }

                // Actualizar tarea
                task.text = newText;
                task.priority = newPriority;
                task.scheduledTime = newTime || null;

                // Guardar y renderizar
                this.saveTasks();
                this.render();
                this.closeEditModal();
            }

            // ==========================================
            // FILTROS
            // ==========================================

            /**
             * Establece el filtro activo
             * @param {string} filter - 'all', 'pending', o 'completed'
             */
            setFilter(filter) {
                this.currentFilter = filter;
                
                // Actualizar botones activos
                this.filterBtns.forEach(btn => {
                    if (btn.dataset.filter === filter) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                
                this.render();
            }

            /**
             * Obtiene las tareas filtradas según el filtro activo
             * @returns {Array} Tareas filtradas
             */
            getFilteredTasks() {
                switch (this.currentFilter) {
                    case 'pending':
                        return this.tasks.filter(t => !t.completed);
                    case 'completed':
                        return this.tasks.filter(t => t.completed);
                    default:
                        return this.tasks;
                }
            }

            // ==========================================
            // PERSISTENCIA (localStorage)
            // ==========================================

            /**
             * Guarda las tareas en localStorage
             */
            saveTasks() {
                try {
                    localStorage.setItem('taskflow_tasks', JSON.stringify(this.tasks));
                } catch (e) {
                    console.error('Error al guardar en localStorage:', e);
                }
            }

            /**
             * Carga las tareas desde localStorage
             * @returns {Array} Tareas guardadas o array vacío
             */
            loadTasks() {
                try {
                    const saved = localStorage.getItem('taskflow_tasks');
                    return saved ? JSON.parse(saved) : [];
                } catch (e) {
                    console.error('Error al cargar desde localStorage:', e);
                    return [];
                }
            }

            // ==========================================
            // RENDERIZADO
            // ==========================================

            /**
             * Renderiza toda la UI
             */
            render() {
                this.renderTasks();
                this.renderStats();
                this.updateClearButton();
            }

            /**
             * Renderiza la lista de tareas
             */
            renderTasks() {
                const filteredTasks = this.getFilteredTasks();
                
                // Mostrar/ocultar estado vacío
                if (filteredTasks.length === 0) {
                    this.tasksList.style.display = 'none';
                    this.emptyState.style.display = 'block';
                    return;
                } else {
                    this.tasksList.style.display = 'flex';
                    this.emptyState.style.display = 'none';
                }

                // Renderizar cada tarea
                this.tasksList.innerHTML = filteredTasks.map(task => `
                    <li class="task-item ${task.completed ? 'completed' : ''} priority-${task.priority || 'medium'}" data-task-id="${task.id}">
                        <label class="task-checkbox">
                            <input 
                                type="checkbox" 
                                ${task.completed ? 'checked' : ''}
                                onchange="taskManager.toggleTask(${task.id})"
                            >
                            <span class="checkmark"></span>
                        </label>
                        <div class="task-content">
                            <span class="task-text">${this.escapeHtml(task.text)}</span>
                            <div class="task-meta">
                                ${task.scheduledTime ? `<span class="task-time">🕐 ${this.formatTime(task.scheduledTime)}</span>` : ''}
                                <span class="task-priority">${this.getPriorityLabel(task.priority || 'medium')}</span>
                            </div>
                        </div>
                        <div class="task-actions">
                            <button 
                                class="edit-btn" 
                                onclick="taskManager.openEditModal(${task.id})"
                                aria-label="Editar tarea"
                                title="Editar tarea"
                            >
                                ✏️
                            </button>
                            <button 
                                class="delete-btn" 
                                onclick="taskManager.deleteTask(${task.id})"
                                aria-label="Eliminar tarea"
                            >
                                ×
                            </button>
                        </div>
                    </li>
                `).join('');
            }

            /**
             * Renderiza las estadísticas
             */
            renderStats() {
                const pendingTasks = this.tasks.filter(t => !t.completed).length;
                this.pendingCount.textContent = pendingTasks;
            }

            /**
             * Actualiza el estado del botón de limpiar
             */
            updateClearButton() {
                const hasCompleted = this.tasks.some(t => t.completed);
                this.clearBtn.disabled = !hasCompleted;
            }

            // ==========================================
            // UTILIDADES
            // ==========================================

            /**
             * Escapa caracteres HTML para prevenir XSS
             * @param {string} text - Texto a escapar
             * @returns {string} Texto escapado
             */
            escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }

            /**
             * Formatea la hora programada de una tarea
             * @param {string} scheduledTime - Hora programada en formato HH:MM
             * @returns {string} Hora formateada o vacío si no hay hora
             */
            formatTime(scheduledTime) {
                return scheduledTime || '';
            }

            /**
             * Obtiene la etiqueta de prioridad
             * @param {string} priority - Nivel de prioridad
             * @returns {string} Etiqueta con emoji
             */
            getPriorityLabel(priority) {
                const labels = {
                    high: '🔴 Alta',
                    medium: '🟡 Media',
                    low: '🟢 Baja'
                };
                return labels[priority] || labels.medium;
            }
        }

        // ==========================================
        // INICIALIZACIÓN
        // ==========================================

        // Crear instancia global del gestor de tareas
        let taskManager;

        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                taskManager = new TaskManager();
            });
        } else {
            taskManager = new TaskManager();
        }